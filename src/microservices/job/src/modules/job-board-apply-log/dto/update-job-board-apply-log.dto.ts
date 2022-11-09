import { PartialType } from '@nestjs/mapped-types';
import { CreateJobBoardApplyLogDto } from './create-job-board-apply-log.dto';

export class UpdateJobBoardApplyLogDto extends PartialType(CreateJobBoardApplyLogDto) {}
