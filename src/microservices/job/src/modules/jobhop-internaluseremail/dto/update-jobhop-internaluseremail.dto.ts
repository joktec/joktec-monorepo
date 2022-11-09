import { PartialType } from '@nestjs/mapped-types';
import { CreateJobhopInternalUserEmailDto } from './create-jobhop-internaluseremail.dto';

export class UpdateJobhopInternalUserEmailDto extends PartialType(CreateJobhopInternalUserEmailDto) {}
