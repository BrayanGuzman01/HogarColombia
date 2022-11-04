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
  Cliente,
  Inmuebles,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteInmueblesController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Array of Cliente has many Inmuebles',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Inmuebles)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Inmuebles>,
  ): Promise<Inmuebles[]> {
    return this.clienteRepository.inmuebles(id).find(filter);
  }

  @post('/clientes/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Inmuebles)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmuebles, {
            title: 'NewInmueblesInCliente',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) inmuebles: Omit<Inmuebles, 'id'>,
  ): Promise<Inmuebles> {
    return this.clienteRepository.inmuebles(id).create(inmuebles);
  }

  @patch('/clientes/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Cliente.Inmuebles PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmuebles, {partial: true}),
        },
      },
    })
    inmuebles: Partial<Inmuebles>,
    @param.query.object('where', getWhereSchemaFor(Inmuebles)) where?: Where<Inmuebles>,
  ): Promise<Count> {
    return this.clienteRepository.inmuebles(id).patch(inmuebles, where);
  }

  @del('/clientes/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Cliente.Inmuebles DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Inmuebles)) where?: Where<Inmuebles>,
  ): Promise<Count> {
    return this.clienteRepository.inmuebles(id).delete(where);
  }
}
