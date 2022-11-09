import { PartialType } from '@nestjs/mapped-types';
import { CreateMarketValueInstructionFeedbackDto } from './create-market-value-instruction-feedback.dto';

export class UpdateMarketValueInstructionFeedbackDto extends PartialType(CreateMarketValueInstructionFeedbackDto) {}
