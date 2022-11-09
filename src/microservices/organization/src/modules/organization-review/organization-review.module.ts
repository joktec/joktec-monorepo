import { Module } from '@nestjs/common';
import { OrganizationReviewService } from './organization-review.service';
import { OrganizationReviewController } from './organization-review.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationReview, OrganizationReviewSchema } from './schemas/organization-review.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OrganizationReview.name, schema: OrganizationReviewSchema }]),
  ],
  controllers: [OrganizationReviewController],
  providers: [OrganizationReviewService]
})
export class OrganizationReviewModule {}
