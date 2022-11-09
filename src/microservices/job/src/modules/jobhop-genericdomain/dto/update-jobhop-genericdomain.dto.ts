import { PartialType } from '@nestjs/mapped-types';
import { CreateJobhopGenericDomainDto } from './create-jobhop-genericdomain.dto';

export class UpdateJobhopGenericDomainDto extends PartialType(CreateJobhopGenericDomainDto) {}
