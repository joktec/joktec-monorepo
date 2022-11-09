import {
  BaseMicroserviceController,
  OrganizationMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { OrganizationService } from './organization.service';

@Controller('organization')
export class OrganizationController extends BaseMicroserviceController(
  OrganizationMessagePattern,
) {
  constructor(private readonly organizationService: OrganizationService) {
    super(organizationService);
  }
}
