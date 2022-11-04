import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {TipoSolicitud, TipoSolicitudRelations, Inmuebles} from '../models';
import {InmueblesRepository} from './inmuebles.repository';

export class TipoSolicitudRepository extends DefaultCrudRepository<
  TipoSolicitud,
  typeof TipoSolicitud.prototype.id,
  TipoSolicitudRelations
> {

  public readonly inmuebles: BelongsToAccessor<Inmuebles, typeof TipoSolicitud.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('InmueblesRepository') protected inmueblesRepositoryGetter: Getter<InmueblesRepository>,
  ) {
    super(TipoSolicitud, dataSource);
    this.inmuebles = this.createBelongsToAccessorFor('inmuebles', inmueblesRepositoryGetter,);
    this.registerInclusionResolver('inmuebles', this.inmuebles.inclusionResolver);
  }
}
