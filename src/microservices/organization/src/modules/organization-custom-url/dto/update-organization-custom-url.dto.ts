import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationCustomUrlDto } from './create-organization-custom-url.dto';

export class UpdateOrganizationCustomUrlDto extends PartialType(CreateOrganizationCustomUrlDto) {
  id: string;
}
