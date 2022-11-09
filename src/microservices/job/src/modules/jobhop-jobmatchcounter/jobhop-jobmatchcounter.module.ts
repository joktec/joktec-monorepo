import {
  JobhopJobMatchCounter,
  JobhopJobMatchCounterSchema,
} from './schemas/jobhop-jobmatchcounter.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobhopJobMatchCounterService } from './jobhop-jobmatchcounter.service';
import { JobhopJobMatchCounterController } from './jobhop-jobmatchcounter.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobhopJobMatchCounter.name,
        schema: JobhopJobMatchCounterSchema,
      },
    ]),
  ],
  controllers: [JobhopJobMatchCounterController],
  providers: [JobhopJobMatchCounterService],
})
export class JobhopJobMatchCounterModule {}
