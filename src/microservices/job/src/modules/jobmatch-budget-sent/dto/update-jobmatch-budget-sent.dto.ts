import { PartialType } from '@nestjs/mapped-types';
import { CreateJobMatchBudgetSentDto } from './create-jobmatch-budget-sent.dto';

export class UpdateJobMatchBudgetSentDto extends PartialType(CreateJobMatchBudgetSentDto) {}
