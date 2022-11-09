import { PartialType } from '@nestjs/mapped-types';
import { CreateJobhopUserAttemptLoginDto } from './create-jobhop-userattemptlogin.dto';

export class UpdateJobhopUserAttemptLoginDto extends PartialType(CreateJobhopUserAttemptLoginDto) {}
