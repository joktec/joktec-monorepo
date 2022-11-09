import { PartialType } from '@nestjs/mapped-types';
import { CreateJobhopOrganizationBenefitDto } from './create-jobhop-organizationbenefit.dto';

export class UpdateJobhopOrganizationBenefitDto extends PartialType(CreateJobhopOrganizationBenefitDto) {}
