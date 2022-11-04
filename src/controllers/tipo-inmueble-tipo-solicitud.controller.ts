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
  TipoInmueble,
  TipoSolicitud,
} from '../models';
import {TipoInmuebleRepository} from '../repositories';

export class TipoInmuebleTipoSolicitudController {
  constructor(
    @repository(TipoInmuebleRepository) protected tipoInmuebleRepository: TipoInmuebleRepository,
  ) { }

  @get('/tipo-inmuebles/{id}/tipo-solicitud', {
    responses: {
      '200': {
        description: 'TipoInmueble has one TipoSolicitud',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TipoSolicitud),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<TipoSolicitud>,
  ): Promise<TipoSolicitud> {
    return this.tipoInmuebleRepository.tipoSolicitud(id).get(filter);
  }

  @post('/tipo-inmuebles/{id}/tipo-solicitud', {
    responses: {
      '200': {
        description: 'TipoInmueble model instance',
        content: {'application/json': {schema: getModelSchemaRef(TipoSolicitud)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof TipoInmueble.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoSolicitud, {
            title: 'NewTipoSolicitudInTipoInmueble',
            exclude: ['id'],
            optional: ['tipoInmuebleId']
          }),
        },
      },
    }) tipoSolicitud: Omit<TipoSolicitud, 'id'>,
  ): Promise<TipoSolicitud> {
    return this.tipoInmuebleRepository.tipoSolicitud(id).create(tipoSolicitud);
  }

  @patch('/tipo-inmuebles/{id}/tipo-solicitud', {
    responses: {
      '200': {
        description: 'TipoInmueble.TipoSolicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoSolicitud, {partial: true}),
        },
      },
    })
    tipoSolicitud: Partial<TipoSolicitud>,
    @param.query.object('where', getWhereSchemaFor(TipoSolicitud)) where?: Where<TipoSolicitud>,
  ): Promise<Count> {
    return this.tipoInmuebleRepository.tipoSolicitud(id).patch(tipoSolicitud, where);
  }

  @del('/tipo-inmuebles/{id}/tipo-solicitud', {
    responses: {
      '200': {
        description: 'TipoInmueble.TipoSolicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(TipoSolicitud)) where?: Where<TipoSolicitud>,
  ): Promise<Count> {
    return this.tipoInmuebleRepository.tipoSolicitud(id).delete(where);
  }
}
