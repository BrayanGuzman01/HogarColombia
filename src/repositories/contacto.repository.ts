import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Contacto, ContactoRelations, Cliente} from '../models';
import {ClienteRepository} from './cliente.repository';

export class ContactoRepository extends DefaultCrudRepository<
  Contacto,
  typeof Contacto.prototype.id,
  ContactoRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Contacto.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Contacto, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
