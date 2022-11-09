import { PartialType } from '@nestjs/mapped-types';
import { CreateJobhopBlacklistDomainDto } from './create-jobhop-blacklistdomain.dto';

export class UpdateJobhopBlacklistDomainDto extends PartialType(CreateJobhopBlacklistDomainDto) {}
