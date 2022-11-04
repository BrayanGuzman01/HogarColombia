import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Cliente, ClienteRelations, Inmuebles} from '../models';
import {InmueblesRepository} from './inmuebles.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly inmuebles: HasManyRepositoryFactory<Inmuebles, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('InmueblesRepository') protected inmueblesRepositoryGetter: Getter<InmueblesRepository>,
  ) {
    super(Cliente, dataSource);
    this.inmuebles = this.createHasManyRepositoryFactoryFor('inmuebles', inmueblesRepositoryGetter,);
    this.registerInclusionResolver('inmuebles', this.inmuebles.inclusionResolver);
  }
}
