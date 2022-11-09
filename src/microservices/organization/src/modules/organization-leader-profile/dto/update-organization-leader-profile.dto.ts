import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationLeaderProfileDto } from './create-organization-leader-profile.dto';

export class UpdateOrganizationLeaderProfileDto extends PartialType(CreateOrganizationLeaderProfileDto) {
  id: string;
}
