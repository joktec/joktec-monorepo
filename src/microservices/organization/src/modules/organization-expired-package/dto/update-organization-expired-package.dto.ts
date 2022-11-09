import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationExpiredPackageDto } from './create-organization-expired-package.dto';

export class UpdateOrganizationExpiredPackageDto extends PartialType(CreateOrganizationExpiredPackageDto) {
  id: string;
}
