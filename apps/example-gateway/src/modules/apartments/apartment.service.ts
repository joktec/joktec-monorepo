import { BaseService, Injectable } from '@joktec/core';
import { Apartment } from '../../models/entities';
import { ApartmentRepo } from '../../repositories';

@Injectable()
export class ApartmentService extends BaseService<Apartment, string> {
  constructor(protected apartmentRepo: ApartmentRepo) {
    super(apartmentRepo);
  }
}
