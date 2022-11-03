import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Registro, RegistroRelations} from '../models';

export class RegistroRepository extends DefaultCrudRepository<
  Registro,
  typeof Registro.prototype.id,
  RegistroRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Registro, dataSource);
  }
}
