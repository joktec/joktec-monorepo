import { PartialType } from '@nestjs/mapped-types';
import { CreateJobBudgetDto } from './create-job-budget.dto';

export class UpdateJobBudgetDto extends PartialType(CreateJobBudgetDto) {}
