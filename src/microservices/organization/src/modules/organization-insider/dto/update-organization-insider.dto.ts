import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationInsiderDto } from './create-organization-insider.dto';

export class UpdateOrganizationInsiderDto extends PartialType(CreateOrganizationInsiderDto) {
  id: string;
}
