import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationRecruiterDto } from './create-organization-recruiter.dto';

export class UpdateOrganizationRecruiterDto extends PartialType(CreateOrganizationRecruiterDto) {
  id: string;
}
