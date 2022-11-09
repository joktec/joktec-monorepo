import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrganizationRecruiterService } from './organization-recruiter.service';
import { CreateOrganizationRecruiterDto } from './dto/create-organization-recruiter.dto';
import { UpdateOrganizationRecruiterDto } from './dto/update-organization-recruiter.dto';

@Controller()
export class OrganizationRecruiterController {
  constructor(private readonly organizationRecruiterService: OrganizationRecruiterService) {}

  @MessagePattern('createOrganizationRecruiter')
  create(@Payload() createOrganizationRecruiterDto: CreateOrganizationRecruiterDto) {
    return this.organizationRecruiterService.create(createOrganizationRecruiterDto);
  }

  @MessagePattern('findAllOrganizationRecruiter')
  findAll() {
    return this.organizationRecruiterService.findAll();
  }

  @MessagePattern('findOneOrganizationRecruiter')
  findById(@Payload() id: string) {
    return this.organizationRecruiterService.findById(id);
  }

  @MessagePattern('updateOrganizationRecruiter')
  update(@Payload() updateOrganizationRecruiterDto: UpdateOrganizationRecruiterDto) {
    return this.organizationRecruiterService.update(updateOrganizationRecruiterDto.id, updateOrganizationRecruiterDto);
  }

  @MessagePattern('removeOrganizationRecruiter')
  remove(@Payload() id: string) {
    return this.organizationRecruiterService.remove(id);
  }
}
