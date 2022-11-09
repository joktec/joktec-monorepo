import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrganizationMediaService } from './organization-media.service';
import { CreateOrganizationMediaDto } from './dto/create-organization-media.dto';
import { UpdateOrganizationMediaDto } from './dto/update-organization-media.dto';

@Controller()
export class OrganizationMediaController {
  constructor(private readonly organizationMediaService: OrganizationMediaService) {}

  @MessagePattern('createOrganizationMedia')
  create(@Payload() createOrganizationMediaDto: CreateOrganizationMediaDto) {
    return this.organizationMediaService.create(createOrganizationMediaDto);
  }

  @MessagePattern('findAllOrganizationMedia')
  findAll() {
    return this.organizationMediaService.findAll();
  }

  @MessagePattern('findOneOrganizationMedia')
  findById(@Payload() id: string) {
    return this.organizationMediaService.findById(id);
  }

  @MessagePattern('updateOrganizationMedia')
  update(@Payload() updateOrganizationMediaDto: UpdateOrganizationMediaDto) {
    return this.organizationMediaService.update(updateOrganizationMediaDto.id, updateOrganizationMediaDto);
  }

  @MessagePattern('removeOrganizationMedia')
  remove(@Payload() id: string) {
    return this.organizationMediaService.remove(id);
  }
}
