import { Controller } from '@nestjs/common';
import { OrganizationPackageService } from './organization-package.service';
import { BaseMicroserviceController, OrganizationPackageMessagePattern } from '@jobhopin/core';

@Controller('organization-package')
export class OrganizationPackageController extends BaseMicroserviceController(
  OrganizationPackageMessagePattern,
) {
  constructor(
    private readonly organizationPackageService: OrganizationPackageService,
  ) {
    super(organizationPackageService);
  }
}