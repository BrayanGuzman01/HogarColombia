import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Inmuebles, InmueblesRelations} from '../models';

export class InmueblesRepository extends DefaultCrudRepository<
  Inmuebles,
  typeof Inmuebles.prototype.id,
  InmueblesRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Inmuebles, dataSource);
  }
}
