import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationPackageHistoryDto } from './create-organization-package-history.dto';

export class UpdateOrganizationPackageHistoryDto extends PartialType(CreateOrganizationPackageHistoryDto) {
  id: string;
}
