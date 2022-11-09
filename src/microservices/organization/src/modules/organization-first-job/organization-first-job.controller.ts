import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrganizationFirstJobService } from './organization-first-job.service';
import { CreateOrganizationFirstJobDto } from './dto/create-organization-first-job.dto';
import { UpdateOrganizationFirstJobDto } from './dto/update-organization-first-job.dto';

@Controller()
export class OrganizationFirstJobController {
  constructor(private readonly organizationFirstJobService: OrganizationFirstJobService) {}

  @MessagePattern('createOrganizationFirstJob')
  create(@Payload() createOrganizationFirstJobDto: CreateOrganizationFirstJobDto) {
    return this.organizationFirstJobService.create(createOrganizationFirstJobDto);
  }

  @MessagePattern('findAllOrganizationFirstJob')
  findAll() {
    return this.organizationFirstJobService.findAll();
  }

  @MessagePattern('findOneOrganizationFirstJob')
  findById(@Payload() id: string) {
    return this.organizationFirstJobService.findById(id);
  }

  @MessagePattern('updateOrganizationFirstJob')
  update(@Payload() updateOrganizationFirstJobDto: UpdateOrganizationFirstJobDto) {
    return this.organizationFirstJobService.update(updateOrganizationFirstJobDto.id, updateOrganizationFirstJobDto);
  }

  @MessagePattern('removeOrganizationFirstJob')
  remove(@Payload() id: string) {
    return this.organizationFirstJobService.remove(id);
  }
}
