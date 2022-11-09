import {
  JobhopUserJobSentrecc,
  JobhopUserJobSentreccSchema,
} from './schemas/jobhop-userjobsentrecc.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobhopUserJobSentreccService } from './jobhop-userjobsentrecc.service';
import { JobhopUserJobSentreccController } from './jobhop-userjobsentrecc.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobhopUserJobSentrecc.name,
        schema: JobhopUserJobSentreccSchema,
      },
    ]),
  ],
  controllers: [JobhopUserJobSentreccController],
  providers: [JobhopUserJobSentreccService],
})
export class JobhopUserJobSentreccModule {}
