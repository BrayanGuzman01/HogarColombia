import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Rol, RolRelations, Empleados} from '../models';
import {EmpleadosRepository} from './empleados.repository';

export class RolRepository extends DefaultCrudRepository<
  Rol,
  typeof Rol.prototype.id,
  RolRelations
> {

  public readonly empleados: BelongsToAccessor<Empleados, typeof Rol.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EmpleadosRepository') protected empleadosRepositoryGetter: Getter<EmpleadosRepository>,
  ) {
    super(Rol, dataSource);
    this.empleados = this.createBelongsToAccessorFor('empleados', empleadosRepositoryGetter,);
    this.registerInclusionResolver('empleados', this.empleados.inclusionResolver);
  }
}
