import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Empleados,
TipoSolicitud,
Cliente,
} from '../models';
import {EmpleadosRepository} from '../repositories';

export class EmpleadosClienteController {
  constructor(
    @repository(EmpleadosRepository) protected empleadosRepository: EmpleadosRepository,
  ) { }

  @get('/empleados/{id}/clientes', {
    responses: {
      '200': {
        description: 'Array of Empleados has many Cliente through TipoSolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.empleadosRepository.clientes(id).find(filter);
  }

  @post('/empleados/{id}/clientes', {
    responses: {
      '200': {
        description: 'create a Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empleados.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewClienteInEmpleados',
            exclude: ['id'],
          }),
        },
      },
    }) cliente: Omit<Cliente, 'id'>,
  ): Promise<Cliente> {
    return this.empleadosRepository.clientes(id).create(cliente);
  }

  @patch('/empleados/{id}/clientes', {
    responses: {
      '200': {
        description: 'Empleados.Cliente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Partial<Cliente>,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.empleadosRepository.clientes(id).patch(cliente, where);
  }

  @del('/empleados/{id}/clientes', {
    responses: {
      '200': {
        description: 'Empleados.Cliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.empleadosRepository.clientes(id).delete(where);
  }
}
