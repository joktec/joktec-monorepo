import { PartialType } from '@nestjs/mapped-types';
import { CreateRecruiterPaymentDto } from './create-recruiter-payment.dto';

export class UpdateRecruiterPaymentDto extends PartialType(CreateRecruiterPaymentDto) {}
