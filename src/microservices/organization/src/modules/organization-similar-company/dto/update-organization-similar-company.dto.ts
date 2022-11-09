import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationSimilarCompanyDto } from './create-organization-similar-company.dto';

export class UpdateOrganizationSimilarCompanyDto extends PartialType(CreateOrganizationSimilarCompanyDto) {
  id: string;
}
