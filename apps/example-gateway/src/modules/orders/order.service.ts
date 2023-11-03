import { BaseService, Injectable, JwtPayload } from '@joktec/core';
import { IMongoRequest, mongoose } from '@joktec/mongo';
import { Order } from './models';
import { OrderRepo } from './order.repo';

@Injectable()
export class OrderService extends BaseService<Order, string> {
  constructor(protected orderRepo: OrderRepo) {
    super(orderRepo);
  }

  /**
   * Override findOne to allow find by code
   * @param id
   * @param req
   * @param payload
   */
  async findById(id: string, req: IMongoRequest<Order> = {}, payload?: JwtPayload): Promise<Order> {
    const findKey = mongoose.Types.ObjectId.isValid(id) ? 'id' : 'code';
    const findValue = findKey === 'code' ? id.toUpperCase() : id;
    req.condition = { [findKey]: findValue };
    return this.orderRepo.findOne(req);
  }
}
