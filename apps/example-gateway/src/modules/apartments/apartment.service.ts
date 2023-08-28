import { BaseService, IBaseRequest, Injectable, JwtPayload } from '@joktec/core';
import { mongoose } from '@joktec/mongo';
import { ApartmentRepo } from './apartment.repo';
import { Apartment } from './models';

@Injectable()
export class ApartmentService extends BaseService<Apartment, string> {
  constructor(protected apartmentRepo: ApartmentRepo) {
    super(apartmentRepo);
  }

  /**
   * Override findOne function to allow query by code
   * @param id
   * @param req
   * @param payload
   */
  async findById(id: string, req: IBaseRequest<Apartment> = {}, payload?: JwtPayload): Promise<Apartment> {
    const findKey = mongoose.Types.ObjectId.isValid(id) ? 'id' : 'code';
    const findValue = findKey === 'code' ? id.toUpperCase() : id;
    req.condition = { [findKey]: findValue };
    return this.apartmentRepo.findOne(req);
  }
}
