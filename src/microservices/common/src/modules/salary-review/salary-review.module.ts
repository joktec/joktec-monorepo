import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SalaryReviewService } from './salary-review.service';
import { SalaryReviewController } from './salary-review.controller';
import { SalaryReview, SalaryReviewSchema } from './schemas/salary-review.schema';
import { CityModule } from '../city';
import { LevelModule } from '../level';
import { YearOfExperienceModule } from '../year-of-experience';
// import { JobTypeModule } from './../../../../job/src/modules/job-type/job-type.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SalaryReview.name, schema: SalaryReviewSchema },
    ]),
    forwardRef(() => CityModule),
    // forwardRef(() => JobTypeModule),
    forwardRef(() => LevelModule),
    forwardRef(() => YearOfExperienceModule),
  ],
  providers: [SalaryReviewService],
  controllers: [SalaryReviewController],
  exports: [SalaryReviewService],
})
export class SalaryReviewModule { }
