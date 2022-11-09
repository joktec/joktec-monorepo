import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationSizeDto } from './create-organization-size.dto';

export class UpdateOrganizationSizeDto extends PartialType(CreateOrganizationSizeDto) {
  id: string;
}
