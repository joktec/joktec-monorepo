import { MongooseModule } from '@nestjs/mongoose';
import { Recruiter, RecruiterSchema } from './schemas/recruiter.schema';
import { Module } from '@nestjs/common';
import { RecruiterService } from './recruiter.service';
import { RecruiterController } from './recruiter.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Recruiter.name, schema: RecruiterSchema },
    ]),
  ],
  controllers: [RecruiterController],
  providers: [RecruiterService],
})
export class RecruiterModule {}
