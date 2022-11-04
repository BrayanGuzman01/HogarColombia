import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Contacto,
  Cliente,
} from '../models';
import {ContactoRepository} from '../repositories';

export class ContactoClienteController {
  constructor(
    @repository(ContactoRepository)
    public contactoRepository: ContactoRepository,
  ) { }

  @get('/contactos/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Contacto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.string('id') id: typeof Contacto.prototype.id,
  ): Promise<Cliente> {
    return this.contactoRepository.cliente(id);
  }
}
