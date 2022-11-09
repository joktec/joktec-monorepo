import { PartialType } from '@nestjs/mapped-types';
import { CreateJobhopUserManualDto } from './create-jobhop-usermanual.dto';

export class UpdateJobhopUserManualDto extends PartialType(CreateJobhopUserManualDto) {}
