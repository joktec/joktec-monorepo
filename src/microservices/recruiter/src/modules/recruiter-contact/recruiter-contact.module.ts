import {
  RecruiterContact,
  RecruiterContactSchema,
} from './schemas/recruiter-contact.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { RecruiterContactService } from './recruiter-contact.service';
import { RecruiterContactController } from './recruiter-contact.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RecruiterContact.name,
        schema: RecruiterContactSchema,
      },
    ]),
  ],
  controllers: [RecruiterContactController],
  providers: [RecruiterContactService],
})
export class RecruiterContactModule {}
