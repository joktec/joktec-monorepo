import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobhopUserManualService } from './jobhop-usermanual.service';
import { JobhopUserManualController } from './jobhop-usermanual.controller';
import {
  JobhopUserManual,
  JobhopUserManualSchema,
} from './schemas/jobhop-usermanual.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobhopUserManual.name,
        schema: JobhopUserManualSchema,
      },
    ]),
  ],
  controllers: [JobhopUserManualController],
  providers: [JobhopUserManualService],
})
export class JobhopUserManualModule {}
