import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationLicenseVerifyDto } from './create-organization-license-verify.dto';

export class UpdateOrganizationLicenseVerifyDto extends PartialType(CreateOrganizationLicenseVerifyDto) {
  id: string;
}
