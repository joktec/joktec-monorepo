import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrganizationCustomUrlService } from './organization-custom-url.service';
import { CreateOrganizationCustomUrlDto } from './dto/create-organization-custom-url.dto';
import { UpdateOrganizationCustomUrlDto } from './dto/update-organization-custom-url.dto';

@Controller()
export class OrganizationCustomUrlController {
  constructor(private readonly organizationCustomUrlService: OrganizationCustomUrlService) {}

  @MessagePattern('createOrganizationCustomUrl')
  create(@Payload() createOrganizationCustomUrlDto: CreateOrganizationCustomUrlDto) {
    return this.organizationCustomUrlService.create(createOrganizationCustomUrlDto);
  }

  @MessagePattern('findAllOrganizationCustomUrl')
  findAll() {
    return this.organizationCustomUrlService.findAll();
  }

  @MessagePattern('findOneOrganizationCustomUrl')
  findById(@Payload() id: string) {
    return this.organizationCustomUrlService.findById(id);
  }

  @MessagePattern('updateOrganizationCustomUrl')
  update(@Payload() updateOrganizationCustomUrlDto: UpdateOrganizationCustomUrlDto) {
    return this.organizationCustomUrlService.update(updateOrganizationCustomUrlDto.id, updateOrganizationCustomUrlDto);
  }

  @MessagePattern('removeOrganizationCustomUrl')
  remove(@Payload() id: string) {
    return this.organizationCustomUrlService.remove(id);
  }
}
