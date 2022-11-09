import {
  JobhopUserAttemptLogin,
  JobhopUserAttemptLoginSchema,
} from './schemas/jobhop-userattemptlogin.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobhopUserAttemptLoginService } from './jobhop-userattemptlogin.service';
import { JobhopUserAttemptLoginController } from './jobhop-userattemptlogin.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobhopUserAttemptLogin.name,
        schema: JobhopUserAttemptLoginSchema,
      },
    ]),
  ],
  controllers: [JobhopUserAttemptLoginController],
  providers: [JobhopUserAttemptLoginService],
})
export class JobhopUserAttemptLoginModule {}
