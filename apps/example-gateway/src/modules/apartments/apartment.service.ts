import { BaseService, Injectable } from '@joktec/core';
import { ApartmentRepo } from './apartment.repo';
import { Apartment } from './models';

@Injectable()
export class ApartmentService extends BaseService<Apartment, string> {
  constructor(protected apartmentRepo: ApartmentRepo) {
    super(apartmentRepo);
  }
}
