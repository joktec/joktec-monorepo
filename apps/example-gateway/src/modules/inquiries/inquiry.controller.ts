import { BaseController, Controller, IControllerProps } from '@joktec/core';
import { AuthGuard, RoleGuard } from '../../common';
import { Inquiry } from '../../models/schemas';
import { InquiryService } from './inquiry.service';
import { InquiryCreateDto } from './models/inquiry.dto';

const props: IControllerProps<Inquiry> = {
  dto: Inquiry,
  guards: [AuthGuard, RoleGuard],
  useBearer: true,
  create: { hooks: [InquiryCreateDto] },
};

@Controller('inquiries')
export class InquiryController extends BaseController<Inquiry, string>(props) {
  constructor(protected inquiryService: InquiryService) {
    super(inquiryService);
  }
}
