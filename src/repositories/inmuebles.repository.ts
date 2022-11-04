import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Inmuebles, InmueblesRelations, Empleados, Ciudades} from '../models';
import {EmpleadosRepository} from './empleados.repository';
import {CiudadesRepository} from './ciudades.repository';

export class InmueblesRepository extends DefaultCrudRepository<
  Inmuebles,
  typeof Inmuebles.prototype.id,
  InmueblesRelations
> {

  public readonly empleados: BelongsToAccessor<Empleados, typeof Inmuebles.prototype.id>;

  public readonly ciudades: BelongsToAccessor<Ciudades, typeof Inmuebles.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EmpleadosRepository') protected empleadosRepositoryGetter: Getter<EmpleadosRepository>, @repository.getter('CiudadesRepository') protected ciudadesRepositoryGetter: Getter<CiudadesRepository>,
  ) {
    super(Inmuebles, dataSource);
    this.ciudades = this.createBelongsToAccessorFor('ciudades', ciudadesRepositoryGetter,);
    this.registerInclusionResolver('ciudades', this.ciudades.inclusionResolver);
    this.empleados = this.createBelongsToAccessorFor('empleados', empleadosRepositoryGetter,);
    this.registerInclusionResolver('empleados', this.empleados.inclusionResolver);
  }
}
