import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationReviewDto } from './create-organization-review.dto';

export class UpdateOrganizationReviewDto extends PartialType(CreateOrganizationReviewDto) {
  id: string;
}
