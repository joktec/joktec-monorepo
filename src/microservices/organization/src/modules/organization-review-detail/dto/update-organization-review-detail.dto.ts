import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationReviewDetailDto } from './create-organization-review-detail.dto';

export class UpdateOrganizationReviewDetailDto extends PartialType(CreateOrganizationReviewDetailDto) {
  id: string;
}
