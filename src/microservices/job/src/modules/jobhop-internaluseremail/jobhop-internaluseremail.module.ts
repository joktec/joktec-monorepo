import {
  JobhopInternalUserEmail,
  JobhopInternalUserEmailSchema,
} from './schemas/jobhop-internaluseremail.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobhopInternalUserEmailService } from './jobhop-internaluseremail.service';
import { JobhopInternalUserEmailController } from './jobhop-internaluseremail.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobhopInternalUserEmail.name,
        schema: JobhopInternalUserEmailSchema,
      },
    ]),
  ],
  controllers: [JobhopInternalUserEmailController],
  providers: [JobhopInternalUserEmailService],
})
export class JobhopInternalUserEmailModule {}
