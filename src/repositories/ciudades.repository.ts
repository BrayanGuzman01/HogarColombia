import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Ciudades, CiudadesRelations} from '../models';

export class CiudadesRepository extends DefaultCrudRepository<
  Ciudades,
  typeof Ciudades.prototype.id,
  CiudadesRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Ciudades, dataSource);
  }
}
