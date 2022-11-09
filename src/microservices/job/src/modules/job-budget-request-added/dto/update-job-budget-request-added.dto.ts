import { PartialType } from '@nestjs/mapped-types';
import { CreateJobBudgetRequestAddedDto } from './create-job-budget-request-added.dto';

export class UpdateJobBudgetRequestAddedDto extends PartialType(CreateJobBudgetRequestAddedDto) {}
