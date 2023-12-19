import { OmitType, PartialType } from '@joktec/core';
import { Apartment } from './apartment';

export class ApartmentCreateDto extends OmitType(Apartment, [
  '_id',
  'createdAt',
  'createdBy',
  'updatedAt',
  'updatedBy',
  'parent',
  'children',
  'rooms',
  'areas',
] as const) {}

export class ApartmentUpdateDto extends PartialType(ApartmentCreateDto) {}
