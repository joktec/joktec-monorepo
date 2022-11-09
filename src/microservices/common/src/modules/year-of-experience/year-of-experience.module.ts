import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { YearOfExperienceService } from './year-of-experience.service';
import { YearOfExperienceController } from './year-of-experience.controller';
import { YearOfExperience, YearOfExperienceSchema } from './schemas/year-of-experience.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: YearOfExperience.name, schema: YearOfExperienceSchema },
    ]),
  ],
  providers: [YearOfExperienceService],
  controllers: [YearOfExperienceController],
  exports: [YearOfExperienceService],
})
export class YearOfExperienceModule { }
