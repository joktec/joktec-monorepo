import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrganizationPlatformService } from './organization-platform.service';
import { CreateOrganizationPlatformDto } from './dto/create-organization-platform.dto';
import { UpdateOrganizationPlatformDto } from './dto/update-organization-platform.dto';

@Controller()
export class OrganizationPlatformController {
  constructor(private readonly organizationPlatformService: OrganizationPlatformService) {}

  @MessagePattern('createOrganizationPlatform')
  create(@Payload() createOrganizationPlatformDto: CreateOrganizationPlatformDto) {
    return this.organizationPlatformService.create(createOrganizationPlatformDto);
  }

  @MessagePattern('findAllOrganizationPlatform')
  findAll() {
    return this.organizationPlatformService.findAll();
  }

  @MessagePattern('findOneOrganizationPlatform')
  findById(@Payload() id: string) {
    return this.organizationPlatformService.findById(id);
  }

  @MessagePattern('updateOrganizationPlatform')
  update(@Payload() updateOrganizationPlatformDto: UpdateOrganizationPlatformDto) {
    return this.organizationPlatformService.update(updateOrganizationPlatformDto.id, updateOrganizationPlatformDto);
  }

  @MessagePattern('removeOrganizationPlatform')
  remove(@Payload() id: string) {
    return this.organizationPlatformService.remove(id);
  }
}
