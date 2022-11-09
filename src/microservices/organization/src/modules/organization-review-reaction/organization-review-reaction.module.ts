import { Module } from '@nestjs/common';
import { OrganizationReviewReactionService } from './organization-review-reaction.service';
import { OrganizationReviewReactionController } from './organization-review-reaction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationReviewReaction, OrganizationReviewReactionSchema } from './schemas/organization-review-reaction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OrganizationReviewReaction.name, schema: OrganizationReviewReactionSchema }]),
  ],
  controllers: [OrganizationReviewReactionController],
  providers: [OrganizationReviewReactionService]
})
export class OrganizationReviewReactionModule {}
