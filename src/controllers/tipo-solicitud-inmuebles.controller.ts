import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  TipoSolicitud,
  Inmuebles,
} from '../models';
import {TipoSolicitudRepository} from '../repositories';

export class TipoSolicitudInmueblesController {
  constructor(
    @repository(TipoSolicitudRepository)
    public tipoSolicitudRepository: TipoSolicitudRepository,
  ) { }

  @get('/tipo-solicituds/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Inmuebles belonging to TipoSolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Inmuebles)},
          },
        },
      },
    },
  })
  async getInmuebles(
    @param.path.string('id') id: typeof TipoSolicitud.prototype.id,
  ): Promise<Inmuebles> {
    return this.tipoSolicitudRepository.inmuebles(id);
  }
}
