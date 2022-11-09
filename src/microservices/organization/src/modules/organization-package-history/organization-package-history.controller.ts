import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrganizationPackageHistoryService } from './organization-package-history.service';
import { CreateOrganizationPackageHistoryDto } from './dto/create-organization-package-history.dto';
import { UpdateOrganizationPackageHistoryDto } from './dto/update-organization-package-history.dto';

@Controller()
export class OrganizationPackageHistoryController {
  constructor(private readonly organizationPackageHistoryService: OrganizationPackageHistoryService) {}

  @MessagePattern('createOrganizationPackageHistory')
  create(@Payload() createOrganizationPackageHistoryDto: CreateOrganizationPackageHistoryDto) {
    return this.organizationPackageHistoryService.create(createOrganizationPackageHistoryDto);
  }

  @MessagePattern('findAllOrganizationPackageHistory')
  findAll() {
    return this.organizationPackageHistoryService.findAll();
  }

  @MessagePattern('findOneOrganizationPackageHistory')
  findById(@Payload() id: string) {
    return this.organizationPackageHistoryService.findById(id);
  }

  @MessagePattern('updateOrganizationPackageHistory')
  update(@Payload() updateOrganizationPackageHistoryDto: UpdateOrganizationPackageHistoryDto) {
    return this.organizationPackageHistoryService.update(updateOrganizationPackageHistoryDto.id, updateOrganizationPackageHistoryDto);
  }

  @MessagePattern('removeOrganizationPackageHistory')
  remove(@Payload() id: string) {
    return this.organizationPackageHistoryService.remove(id);
  }
}
