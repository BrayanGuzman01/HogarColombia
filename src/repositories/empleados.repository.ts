import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Empleados, EmpleadosRelations, Cliente, TipoSolicitud} from '../models';
import {TipoSolicitudRepository} from './tipo-solicitud.repository';
import {ClienteRepository} from './cliente.repository';

export class EmpleadosRepository extends DefaultCrudRepository<
  Empleados,
  typeof Empleados.prototype.id,
  EmpleadosRelations
> {

  public readonly clientes: HasManyThroughRepositoryFactory<Cliente, typeof Cliente.prototype.id,
          TipoSolicitud,
          typeof Empleados.prototype.id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('TipoSolicitudRepository') protected tipoSolicitudRepositoryGetter: Getter<TipoSolicitudRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Empleados, dataSource);
    this.clientes = this.createHasManyThroughRepositoryFactoryFor('clientes', clienteRepositoryGetter, tipoSolicitudRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
  }
}
