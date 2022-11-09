import { Controller } from '@nestjs/common';
import { OrganizationSizeService } from './organization-size.service';
import { BaseMicroserviceController, OrganizationSizeMessagePattern } from '@jobhopin/core';
import { MessagePattern, RpcException } from '@nestjs/microservices';

@Controller('organization-size')
export class OrganizationSizeController extends BaseMicroserviceController(
  OrganizationSizeMessagePattern,
) {
  constructor(
    private readonly organizationSizeService: OrganizationSizeService,
  ) {
    super(organizationSizeService);
  }
}