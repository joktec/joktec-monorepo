import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationSectionDto } from './create-organization-section.dto';

export class UpdateOrganizationSectionDto extends PartialType(CreateOrganizationSectionDto) {
  id: string;
}
