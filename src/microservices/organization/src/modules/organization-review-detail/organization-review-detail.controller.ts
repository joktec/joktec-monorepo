import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrganizationReviewDetailService } from './organization-review-detail.service';
import { CreateOrganizationReviewDetailDto } from './dto/create-organization-review-detail.dto';
import { UpdateOrganizationReviewDetailDto } from './dto/update-organization-review-detail.dto';

@Controller()
export class OrganizationReviewDetailController {
  constructor(private readonly organizationReviewDetailService: OrganizationReviewDetailService) {}

  @MessagePattern('createOrganizationReviewDetail')
  create(@Payload() createOrganizationReviewDetailDto: CreateOrganizationReviewDetailDto) {
    return this.organizationReviewDetailService.create(createOrganizationReviewDetailDto);
  }

  @MessagePattern('findAllOrganizationReviewDetail')
  findAll() {
    return this.organizationReviewDetailService.findAll();
  }

  @MessagePattern('findOneOrganizationReviewDetail')
  findById(@Payload() id: string) {
    return this.organizationReviewDetailService.findById(id);
  }

  @MessagePattern('updateOrganizationReviewDetail')
  update(@Payload() updateOrganizationReviewDetailDto: UpdateOrganizationReviewDetailDto) {
    return this.organizationReviewDetailService.update(updateOrganizationReviewDetailDto.id, updateOrganizationReviewDetailDto);
  }

  @MessagePattern('removeOrganizationReviewDetail')
  remove(@Payload() id: string) {
    return this.organizationReviewDetailService.remove(id);
  }
}
