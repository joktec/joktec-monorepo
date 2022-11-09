import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrganizationReviewReactionService } from './organization-review-reaction.service';
import { CreateOrganizationReviewReactionDto } from './dto/create-organization-review-reaction.dto';
import { UpdateOrganizationReviewReactionDto } from './dto/update-organization-review-reaction.dto';

@Controller()
export class OrganizationReviewReactionController {
  constructor(private readonly organizationReviewReactionService: OrganizationReviewReactionService) {}

  @MessagePattern('createOrganizationReviewReaction')
  create(@Payload() createOrganizationReviewReactionDto: CreateOrganizationReviewReactionDto) {
    return this.organizationReviewReactionService.create(createOrganizationReviewReactionDto);
  }

  @MessagePattern('findAllOrganizationReviewReaction')
  findAll() {
    return this.organizationReviewReactionService.findAll();
  }

  @MessagePattern('findOneOrganizationReviewReaction')
  findById(@Payload() id: string) {
    return this.organizationReviewReactionService.findById(id);
  }

  @MessagePattern('updateOrganizationReviewReaction')
  update(@Payload() updateOrganizationReviewReactionDto: UpdateOrganizationReviewReactionDto) {
    return this.organizationReviewReactionService.update(updateOrganizationReviewReactionDto.id, updateOrganizationReviewReactionDto);
  }

  @MessagePattern('removeOrganizationReviewReaction')
  remove(@Payload() id: string) {
    return this.organizationReviewReactionService.remove(id);
  }
}
