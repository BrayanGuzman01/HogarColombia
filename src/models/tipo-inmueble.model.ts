import {Entity, model, property, hasOne} from '@loopback/repository';
import {TipoSolicitud} from './tipo-solicitud.model';

@model()
export class TipoInmueble extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  apartamento: string;

  @property({
    type: 'string',
    required: true,
  })
  casa: string;

  @property({
    type: 'string',
    required: true,
  })
  localComercial: string;

  @property({
    type: 'string',
    required: true,
  })
  bodega: string;

  @hasOne(() => TipoSolicitud)
  tipoSolicitud: TipoSolicitud;

  constructor(data?: Partial<TipoInmueble>) {
    super(data);
  }
}

export interface TipoInmuebleRelations {
  // describe navigational properties here
}

export type TipoInmuebleWithRelations = TipoInmueble & TipoInmuebleRelations;
