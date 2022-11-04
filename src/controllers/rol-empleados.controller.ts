import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Rol,
  Empleados,
} from '../models';
import {RolRepository} from '../repositories';

export class RolEmpleadosController {
  constructor(
    @repository(RolRepository)
    public rolRepository: RolRepository,
  ) { }

  @get('/rols/{id}/empleados', {
    responses: {
      '200': {
        description: 'Empleados belonging to Rol',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleados)},
          },
        },
      },
    },
  })
  async getEmpleados(
    @param.path.string('id') id: typeof Rol.prototype.id,
  ): Promise<Empleados> {
    return this.rolRepository.empleados(id);
  }
}
