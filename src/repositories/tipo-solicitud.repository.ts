import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {TipoSolicitud, TipoSolicitudRelations} from '../models';

export class TipoSolicitudRepository extends DefaultCrudRepository<
  TipoSolicitud,
  typeof TipoSolicitud.prototype.id,
  TipoSolicitudRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(TipoSolicitud, dataSource);
  }
}
