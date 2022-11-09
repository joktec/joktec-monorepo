import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrganizationInsiderService } from './organization-insider.service';
import { CreateOrganizationInsiderDto } from './dto/create-organization-insider.dto';
import { UpdateOrganizationInsiderDto } from './dto/update-organization-insider.dto';

@Controller()
export class OrganizationInsiderController {
  constructor(private readonly organizationInsiderService: OrganizationInsiderService) {}

  @MessagePattern('createOrganizationInsider')
  create(@Payload() createOrganizationInsiderDto: CreateOrganizationInsiderDto) {
    return this.organizationInsiderService.create(createOrganizationInsiderDto);
  }

  @MessagePattern('findAllOrganizationInsider')
  findAll() {
    return this.organizationInsiderService.findAll();
  }

  @MessagePattern('findOneOrganizationInsider')
  findById(@Payload() id: string) {
    return this.organizationInsiderService.findById(id);
  }

  @MessagePattern('updateOrganizationInsider')
  update(@Payload() updateOrganizationInsiderDto: UpdateOrganizationInsiderDto) {
    return this.organizationInsiderService.update(updateOrganizationInsiderDto.id, updateOrganizationInsiderDto);
  }

  @MessagePattern('removeOrganizationInsider')
  remove(@Payload() id: string) {
    return this.organizationInsiderService.remove(id);
  }
}
