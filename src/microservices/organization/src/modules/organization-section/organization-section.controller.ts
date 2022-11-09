import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrganizationSectionService } from './organization-section.service';
import { CreateOrganizationSectionDto } from './dto/create-organization-section.dto';
import { UpdateOrganizationSectionDto } from './dto/update-organization-section.dto';

@Controller()
export class OrganizationSectionController {
  constructor(private readonly organizationSectionService: OrganizationSectionService) {}

  @MessagePattern('createOrganizationSection')
  create(@Payload() createOrganizationSectionDto: CreateOrganizationSectionDto) {
    return this.organizationSectionService.create(createOrganizationSectionDto);
  }

  @MessagePattern('findAllOrganizationSection')
  findAll() {
    return this.organizationSectionService.findAll();
  }

  @MessagePattern('findOneOrganizationSection')
  findById(@Payload() id: string) {
    return this.organizationSectionService.findById(id);
  }

  @MessagePattern('updateOrganizationSection')
  update(@Payload() updateOrganizationSectionDto: UpdateOrganizationSectionDto) {
    return this.organizationSectionService.update(updateOrganizationSectionDto.id, updateOrganizationSectionDto);
  }

  @MessagePattern('removeOrganizationSection')
  remove(@Payload() id: string) {
    return this.organizationSectionService.remove(id);
  }
}
