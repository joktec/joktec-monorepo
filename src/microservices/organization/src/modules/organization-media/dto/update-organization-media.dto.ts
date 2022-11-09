import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationMediaDto } from './create-organization-media.dto';

export class UpdateOrganizationMediaDto extends PartialType(CreateOrganizationMediaDto) {
  id: string;
}
