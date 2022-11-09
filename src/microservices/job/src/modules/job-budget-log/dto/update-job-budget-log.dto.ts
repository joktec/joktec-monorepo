import { PartialType } from '@nestjs/mapped-types';
import { CreateJobBudgetLogDto } from './create-job-budget-log.dto';

export class UpdateJobBudgetLogDto extends PartialType(CreateJobBudgetLogDto) {}
