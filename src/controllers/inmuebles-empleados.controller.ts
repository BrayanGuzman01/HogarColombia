import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Inmuebles,
  Empleados,
} from '../models';
import {InmueblesRepository} from '../repositories';

export class InmueblesEmpleadosController {
  constructor(
    @repository(InmueblesRepository)
    public inmueblesRepository: InmueblesRepository,
  ) { }

  @get('/inmuebles/{id}/empleados', {
    responses: {
      '200': {
        description: 'Empleados belonging to Inmuebles',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleados)},
          },
        },
      },
    },
  })
  async getEmpleados(
    @param.path.string('id') id: typeof Inmuebles.prototype.id,
  ): Promise<Empleados> {
    return this.inmueblesRepository.empleados(id);
  }
}
