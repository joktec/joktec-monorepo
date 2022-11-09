import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrganizationLeaderProfileService } from './organization-leader-profile.service';
import { CreateOrganizationLeaderProfileDto } from './dto/create-organization-leader-profile.dto';
import { UpdateOrganizationLeaderProfileDto } from './dto/update-organization-leader-profile.dto';

@Controller()
export class OrganizationLeaderProfileController {
  constructor(private readonly organizationLeaderProfileService: OrganizationLeaderProfileService) {}

  @MessagePattern('createOrganizationLeaderProfile')
  create(@Payload() createOrganizationLeaderProfileDto: CreateOrganizationLeaderProfileDto) {
    return this.organizationLeaderProfileService.create(createOrganizationLeaderProfileDto);
  }

  @MessagePattern('findAllOrganizationLeaderProfile')
  findAll() {
    return this.organizationLeaderProfileService.findAll();
  }

  @MessagePattern('findOneOrganizationLeaderProfile')
  findById(@Payload() id: string) {
    return this.organizationLeaderProfileService.findById(id);
  }

  @MessagePattern('updateOrganizationLeaderProfile')
  update(@Payload() updateOrganizationLeaderProfileDto: UpdateOrganizationLeaderProfileDto) {
    return this.organizationLeaderProfileService.update(updateOrganizationLeaderProfileDto.id, updateOrganizationLeaderProfileDto);
  }

  @MessagePattern('removeOrganizationLeaderProfile')
  remove(@Payload() id: string) {
    return this.organizationLeaderProfileService.remove(id);
  }
}
