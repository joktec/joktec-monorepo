import { BaseService, DeepPartial, Inject, Injectable, REQUEST } from '@joktec/core';
import { IRequest } from '../../app.constant';
import { Inquiry } from '../../models/schemas';
import { InquiryRepo } from '../../repositories';

@Injectable()
export class InquiryService extends BaseService<Inquiry, string> {
  constructor(
    protected inquiryRepo: InquiryRepo,
    @Inject(REQUEST) public request: IRequest,
  ) {
    super(inquiryRepo);
  }

  async create(entity: DeepPartial<Inquiry>): Promise<Inquiry> {
    entity.authorId = this.request.loggedUser._id;
    return super.create(entity);
  }
}
