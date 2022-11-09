import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrganizationReviewService } from './organization-review.service';
import { CreateOrganizationReviewDto } from './dto/create-organization-review.dto';
import { UpdateOrganizationReviewDto } from './dto/update-organization-review.dto';

@Controller()
export class OrganizationReviewController {
  constructor(private readonly organizationReviewService: OrganizationReviewService) {}

  @MessagePattern('createOrganizationReview')
  create(@Payload() createOrganizationReviewDto: CreateOrganizationReviewDto) {
    return this.organizationReviewService.create(createOrganizationReviewDto);
  }

  @MessagePattern('findAllOrganizationReview')
  findAll() {
    return this.organizationReviewService.findAll();
  }

  @MessagePattern('findOneOrganizationReview')
  findById(@Payload() id: string) {
    return this.organizationReviewService.findById(id);
  }

  @MessagePattern('updateOrganizationReview')
  update(@Payload() updateOrganizationReviewDto: UpdateOrganizationReviewDto) {
    return this.organizationReviewService.update(updateOrganizationReviewDto.id, updateOrganizationReviewDto);
  }

  @MessagePattern('removeOrganizationReview')
  remove(@Payload() id: string) {
    return this.organizationReviewService.remove(id);
  }
}
