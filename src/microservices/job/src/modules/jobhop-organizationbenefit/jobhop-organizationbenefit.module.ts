import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobhopOrganizationBenefitService } from './jobhop-organizationbenefit.service';
import { JobhopOrganizationBenefitController } from './jobhop-organizationbenefit.controller';
import {
  JobhopOrganizationBenefit,
  JobhopOrganizationBenefitSchema,
} from './schemas/jobhop-organizationbenefit.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobhopOrganizationBenefit.name,
        schema: JobhopOrganizationBenefitSchema,
      },
    ]),
  ],
  controllers: [JobhopOrganizationBenefitController],
  providers: [JobhopOrganizationBenefitService],
})
export class JobhopOrganizationBenefitModule {}
