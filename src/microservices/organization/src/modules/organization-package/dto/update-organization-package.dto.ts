import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationPackageDto } from './create-organization-package.dto';

export class UpdateOrganizationPackageDto extends PartialType(CreateOrganizationPackageDto) {
  id: string;
}
