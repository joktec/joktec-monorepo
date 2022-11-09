import { PartialType } from '@nestjs/mapped-types';
import { CreateJobhopPaymentLinkDto } from './create-jobhop-paymentlink.dto';

export class UpdateJobhopPaymentLinkDto extends PartialType(CreateJobhopPaymentLinkDto) {}
