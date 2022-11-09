import {
  BaseController,
  CreateOrganizationInput,
  OrganizationDto,
  OrganizationListReponseDto,
  OrganizationMessagePattern,
  OrganizationMicroserviceConfig,
  OrganizationQueryInput,
  UpdateOrganizationInput,
} from '@jobhopin/core';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

const organizationMicroserviceConfig = new OrganizationMicroserviceConfig();

@Controller('organization')
export class OrganizationController extends BaseController<
  OrganizationDto,
  CreateOrganizationInput,
  UpdateOrganizationInput,
  OrganizationQueryInput,
  OrganizationListReponseDto
> {
  constructor(
    @Inject(organizationMicroserviceConfig.name)
    private readonly organizationMicroservice: ClientProxy,
  ) {
    super(organizationMicroservice, OrganizationMessagePattern);
  }
}
