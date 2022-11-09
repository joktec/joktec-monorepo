import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationFirstJobDto } from './create-organization-first-job.dto';

export class UpdateOrganizationFirstJobDto extends PartialType(CreateOrganizationFirstJobDto) {
  id: string;
}
