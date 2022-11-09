import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrganizationExpiredPackageService } from './organization-expired-package.service';
import { CreateOrganizationExpiredPackageDto } from './dto/create-organization-expired-package.dto';
import { UpdateOrganizationExpiredPackageDto } from './dto/update-organization-expired-package.dto';

@Controller()
export class OrganizationExpiredPackageController {
  constructor(private readonly organizationExpiredPackageService: OrganizationExpiredPackageService) {}

  @MessagePattern('createOrganizationExpiredPackage')
  create(@Payload() createOrganizationExpiredPackageDto: CreateOrganizationExpiredPackageDto) {
    return this.organizationExpiredPackageService.create(createOrganizationExpiredPackageDto);
  }

  @MessagePattern('findAllOrganizationExpiredPackage')
  findAll() {
    return this.organizationExpiredPackageService.findAll();
  }

  @MessagePattern('findOneOrganizationExpiredPackage')
  findById(@Payload() id: string) {
    return this.organizationExpiredPackageService.findById(id);
  }

  @MessagePattern('updateOrganizationExpiredPackage')
  update(@Payload() updateOrganizationExpiredPackageDto: UpdateOrganizationExpiredPackageDto) {
    return this.organizationExpiredPackageService.update(updateOrganizationExpiredPackageDto.id, updateOrganizationExpiredPackageDto);
  }

  @MessagePattern('removeOrganizationExpiredPackage')
  remove(@Payload() id: string) {
    return this.organizationExpiredPackageService.remove(id);
  }
}
