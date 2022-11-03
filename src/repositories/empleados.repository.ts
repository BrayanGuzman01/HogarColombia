import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Empleados, EmpleadosRelations} from '../models';

export class EmpleadosRepository extends DefaultCrudRepository<
  Empleados,
  typeof Empleados.prototype.id,
  EmpleadosRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Empleados, dataSource);
  }
}
