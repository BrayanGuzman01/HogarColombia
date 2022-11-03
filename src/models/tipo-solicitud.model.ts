import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<TipoSolicitud>) {
    super(data);
  }
}

export interface TipoSolicitudRelations {
  // describe navigational properties here
}

export type TipoSolicitudWithRelations = TipoSolicitud & TipoSolicitudRelations;
