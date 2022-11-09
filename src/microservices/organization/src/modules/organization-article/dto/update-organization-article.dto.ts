import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationArticleDto } from './create-organization-article.dto';

export class UpdateOrganizationArticleDto extends PartialType(CreateOrganizationArticleDto) {
  id: string;
}
