import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrganizationPackageLogService } from './organization-package-log.service';
import { CreateOrganizationPackageLogDto } from './dto/create-organization-package-log.dto';
import { UpdateOrganizationPackageLogDto } from './dto/update-organization-package-log.dto';

@Controller()
export class OrganizationPackageLogController {
  constructor(private readonly organizationPackageLogService: OrganizationPackageLogService) {}

  @MessagePattern('createOrganizationPackageLog')
  create(@Payload() createOrganizationPackageLogDto: CreateOrganizationPackageLogDto) {
    return this.organizationPackageLogService.create(createOrganizationPackageLogDto);
  }

  @MessagePattern('findAllOrganizationPackageLog')
  findAll() {
    return this.organizationPackageLogService.findAll();
  }

  @MessagePattern('findOneOrganizationPackageLog')
  findById(@Payload() id: string) {
    return this.organizationPackageLogService.findById(id);
  }

  @MessagePattern('updateOrganizationPackageLog')
  update(@Payload() updateOrganizationPackageLogDto: UpdateOrganizationPackageLogDto) {
    return this.organizationPackageLogService.update(updateOrganizationPackageLogDto.id, updateOrganizationPackageLogDto);
  }

  @MessagePattern('removeOrganizationPackageLog')
  remove(@Payload() id: string) {
    return this.organizationPackageLogService.remove(id);
  }
}
