import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationPlatformDto } from './create-organization-platform.dto';

export class UpdateOrganizationPlatformDto extends PartialType(CreateOrganizationPlatformDto) {
  id: string;
}
