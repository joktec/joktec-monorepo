import { PickType } from '@joktec/core';
import { Inquiry } from '../../../models/schemas';

export class InquiryCreateDto extends PickType(Inquiry, ['reasonIds', 'reasonText'] as const) {}
