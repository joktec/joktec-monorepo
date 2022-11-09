import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationPackageLogDto } from './create-organization-package-log.dto';

export class UpdateOrganizationPackageLogDto extends PartialType(CreateOrganizationPackageLogDto) {
  id: string;
}
