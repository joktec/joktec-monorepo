import { Module } from '@nestjs/common';
import { OrganizationReviewDetailService } from './organization-review-detail.service';
import { OrganizationReviewDetailController } from './organization-review-detail.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationReviewDetail, OrganizationReviewDetailSchema } from './schemas/organization-review-detail.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OrganizationReviewDetail.name, schema: OrganizationReviewDetailSchema }]),
  ],
  controllers: [OrganizationReviewDetailController],
  providers: [OrganizationReviewDetailService]
})
export class OrganizationReviewDetailModule {}
