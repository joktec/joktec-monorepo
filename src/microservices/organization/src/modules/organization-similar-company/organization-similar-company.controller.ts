import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrganizationSimilarCompanyService } from './organization-similar-company.service';
import { CreateOrganizationSimilarCompanyDto } from './dto/create-organization-similar-company.dto';
import { UpdateOrganizationSimilarCompanyDto } from './dto/update-organization-similar-company.dto';

@Controller()
export class OrganizationSimilarCompanyController {
  constructor(private readonly organizationSimilarCompanyService: OrganizationSimilarCompanyService) {}

  @MessagePattern('createOrganizationSimilarCompany')
  create(@Payload() createOrganizationSimilarCompanyDto: CreateOrganizationSimilarCompanyDto) {
    return this.organizationSimilarCompanyService.create(createOrganizationSimilarCompanyDto);
  }

  @MessagePattern('findAllOrganizationSimilarCompany')
  findAll() {
    return this.organizationSimilarCompanyService.findAll();
  }

  @MessagePattern('findOneOrganizationSimilarCompany')
  findById(@Payload() id: string) {
    return this.organizationSimilarCompanyService.findById(id);
  }

  @MessagePattern('updateOrganizationSimilarCompany')
  update(@Payload() updateOrganizationSimilarCompanyDto: UpdateOrganizationSimilarCompanyDto) {
    return this.organizationSimilarCompanyService.update(updateOrganizationSimilarCompanyDto.id, updateOrganizationSimilarCompanyDto);
  }

  @MessagePattern('removeOrganizationSimilarCompany')
  remove(@Payload() id: string) {
    return this.organizationSimilarCompanyService.remove(id);
  }
}
