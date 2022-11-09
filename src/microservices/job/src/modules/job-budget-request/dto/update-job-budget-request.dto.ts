import { PartialType } from '@nestjs/mapped-types';
import { CreateJobBudgetRequestDto } from './create-job-budget-request.dto';

export class UpdateJobBudgetRequestDto extends PartialType(CreateJobBudgetRequestDto) {}
