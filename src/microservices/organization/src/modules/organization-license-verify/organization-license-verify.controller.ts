import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrganizationLicenseVerifyService } from './organization-license-verify.service';
import { CreateOrganizationLicenseVerifyDto } from './dto/create-organization-license-verify.dto';
import { UpdateOrganizationLicenseVerifyDto } from './dto/update-organization-license-verify.dto';

@Controller()
export class OrganizationLicenseVerifyController {
  constructor(private readonly organizationLicenseVerifyService: OrganizationLicenseVerifyService) {}

  @MessagePattern('createOrganizationLicenseVerify')
  create(@Payload() createOrganizationLicenseVerifyDto: CreateOrganizationLicenseVerifyDto) {
    return this.organizationLicenseVerifyService.create(createOrganizationLicenseVerifyDto);
  }

  @MessagePattern('findAllOrganizationLicenseVerify')
  findAll() {
    return this.organizationLicenseVerifyService.findAll();
  }

  @MessagePattern('findOneOrganizationLicenseVerify')
  findById(@Payload() id: string) {
    return this.organizationLicenseVerifyService.findById(id);
  }

  @MessagePattern('updateOrganizationLicenseVerify')
  update(@Payload() updateOrganizationLicenseVerifyDto: UpdateOrganizationLicenseVerifyDto) {
    return this.organizationLicenseVerifyService.update(updateOrganizationLicenseVerifyDto.id, updateOrganizationLicenseVerifyDto);
  }

  @MessagePattern('removeOrganizationLicenseVerify')
  remove(@Payload() id: string) {
    return this.organizationLicenseVerifyService.remove(id);
  }
}
