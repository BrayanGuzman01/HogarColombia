import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {TipoInmueble, TipoInmuebleRelations, TipoSolicitud} from '../models';
import {TipoSolicitudRepository} from './tipo-solicitud.repository';

export class TipoInmuebleRepository extends DefaultCrudRepository<
  TipoInmueble,
  typeof TipoInmueble.prototype.id,
  TipoInmuebleRelations
> {

  public readonly tipoSolicitud: HasOneRepositoryFactory<TipoSolicitud, typeof TipoInmueble.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('TipoSolicitudRepository') protected tipoSolicitudRepositoryGetter: Getter<TipoSolicitudRepository>,
  ) {
    super(TipoInmueble, dataSource);
    this.tipoSolicitud = this.createHasOneRepositoryFactoryFor('tipoSolicitud', tipoSolicitudRepositoryGetter);
    this.registerInclusionResolver('tipoSolicitud', this.tipoSolicitud.inclusionResolver);
  }
}
