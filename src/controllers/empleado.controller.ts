import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Empleados} from '../models';
import {EmpleadosRepository} from '../repositories';
import {AutenticacionService} from '../services';
const fetch = require("node-fetch")

export class EmpleadoController {
  constructor(
    @repository(EmpleadosRepository)
    public empleadosRepository : EmpleadosRepository
    @service (AutenticacionService)
    public  servicioAutenticacion : AutenticacionService
  ) {}

  @post('/empleados')
  @response(200, {
    description: 'Empleados model instance',
    content: {'application/json': {schema: getModelSchemaRef(Empleados)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleados, {
            title: 'NewEmpleados',
            exclude: ['id'],
          }),
        },
      },
    })
    empleados: Omit<Empleados, 'id'>,
  ): Promise<Empleados> {
    //Generacion de clave para empleado
    let clave = this.servicioAutenticacion.generarClave();
    let claveCifrada = this.servicioAutenticacion.cifrarClave(clave);
    empleados.clave = claveCifrada;
    let e = await this.empleadosRepository.create(empleados);


    //Vamos a notificar al empleado
    let destino = empleados.email;
    let asunto = "Registro en Hogar Colombia";
    let contenido = `Buen día ${empleados.nombres} su nombre de usuario es ${empleados.email} y su contraseña es: ${clave}`
    fetch(`http://127.0.0.1:5000/envio-correo?correo_destino=${destino}&asunto=${asunto}&mensaje=${contenido}`)
      .then((data:any) => {
        console.log(data);
      })
    return e;
  }

  @get('/empleados/count')
  @response(200, {
    description: 'Empleados model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Empleados) where?: Where<Empleados>,
  ): Promise<Count> {
    return this.empleadosRepository.count(where);
  }

  @get('/empleados')
  @response(200, {
    description: 'Array of Empleados model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Empleados, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Empleados) filter?: Filter<Empleados>,
  ): Promise<Empleados[]> {
    return this.empleadosRepository.find(filter);
  }

  @patch('/empleados')
  @response(200, {
    description: 'Empleados PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleados, {partial: true}),
        },
      },
    })
    empleados: Empleados,
    @param.where(Empleados) where?: Where<Empleados>,
  ): Promise<Count> {
    return this.empleadosRepository.updateAll(empleados, where);
  }

  @get('/empleados/{id}')
  @response(200, {
    description: 'Empleados model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Empleados, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Empleados, {exclude: 'where'}) filter?: FilterExcludingWhere<Empleados>
  ): Promise<Empleados> {
    return this.empleadosRepository.findById(id, filter);
  }

  @patch('/empleados/{id}')
  @response(204, {
    description: 'Empleados PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleados, {partial: true}),
        },
      },
    })
    empleados: Empleados,
  ): Promise<void> {
    await this.empleadosRepository.updateById(id, empleados);
  }

  @put('/empleados/{id}')
  @response(204, {
    description: 'Empleados PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() empleados: Empleados,
  ): Promise<void> {
    await this.empleadosRepository.replaceById(id, empleados);
  }

  @del('/empleados/{id}')
  @response(204, {
    description: 'Empleados DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.empleadosRepository.deleteById(id);
  }
}
function then(arg0: (data: any) => void) {
  throw new Error('Function not implemented.');
}

