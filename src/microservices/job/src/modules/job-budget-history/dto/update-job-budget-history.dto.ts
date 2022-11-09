import { PartialType } from '@nestjs/mapped-types';
import { CreateJobBudgetHistoryDto } from './create-job-budget-history.dto';

export class UpdateJobBudgetHistoryDto extends PartialType(CreateJobBudgetHistoryDto) {}
