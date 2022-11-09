import { PartialType } from '@nestjs/mapped-types';
import { CreateJobBudgetSuggestInfoDto } from './create-job-budget-suggest-info.dto';

export class UpdateJobBudgetSuggestInfoDto extends PartialType(CreateJobBudgetSuggestInfoDto) {}
