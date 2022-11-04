import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Inmuebles} from './inmuebles.model';

@model()
export class TipoSolicitud extends Entity {
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
  alquiler: string;

  @property({
    type: 'string',
    required: true,
  })
  compra: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @belongsTo(() => Inmuebles)
  inmueblesId: string;

  @property({
    type: 'string',
  })
  tipoInmuebleId?: string;

  @property({
    type: 'string',
  })
  empleadosId?: string;

  @property({
    type: 'string',
  })
  clienteId?: string;

  constructor(data?: Partial<TipoSolicitud>) {
    super(data);
  }
}

export interface TipoSolicitudRelations {
  // describe navigational properties here
}

export type TipoSolicitudWithRelations = TipoSolicitud & TipoSolicitudRelations;
