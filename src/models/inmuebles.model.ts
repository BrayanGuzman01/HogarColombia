import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Empleados} from './empleados.model';
import {Ciudades} from './ciudades.model';

@model()
export class Inmuebles extends Entity {
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
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  foto: string;

  @belongsTo(() => Empleados)
  empleadosId: string;

  @property({
    type: 'string',
  })
  clienteId?: string;

  @belongsTo(() => Ciudades)
  ciudadesId: string;

  constructor(data?: Partial<Inmuebles>) {
    super(data);
  }
}

export interface InmueblesRelations {
  // describe navigational properties here
}

export type InmueblesWithRelations = Inmuebles & InmueblesRelations;
