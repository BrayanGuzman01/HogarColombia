import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Registro,
  Cliente,
} from '../models';
import {RegistroRepository} from '../repositories';

export class RegistroClienteController {
  constructor(
    @repository(RegistroRepository)
    public registroRepository: RegistroRepository,
  ) { }

  @get('/registros/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Registro',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.string('id') id: typeof Registro.prototype.id,
  ): Promise<Cliente> {
    return this.registroRepository.cliente(id);
  }
}
