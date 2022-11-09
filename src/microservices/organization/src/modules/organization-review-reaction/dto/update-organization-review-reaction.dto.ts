import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationReviewReactionDto } from './create-organization-review-reaction.dto';

export class UpdateOrganizationReviewReactionDto extends PartialType(CreateOrganizationReviewReactionDto) {
  id: string;
}
