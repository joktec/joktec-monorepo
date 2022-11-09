import { Module } from '@nestjs/common';
import { JobseekerMarketValueService } from './jobseeker_market_value.service';
import { JobseekerMarketValueController } from './jobseeker_market_value.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  JobseekerMarketValue,
  JobseekerMarketValueSchema,
} from './schemas/jobseeker_market_value.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobseekerMarketValue.name, schema: JobseekerMarketValueSchema },
    ]),
  ],
  controllers: [JobseekerMarketValueController],
  providers: [JobseekerMarketValueService]
})
export class JobseekerMarketValueModule {}
