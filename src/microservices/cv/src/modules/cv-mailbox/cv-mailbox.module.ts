import { Module } from '@nestjs/common';
import { CvMailBoxService } from './cv-mailbox.service';
import { CvMailboxController } from './cv-mailbox.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CvMailBox,
  CvMailBoxSchema,
} from './schemas/cv-mailbox.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CvMailBox.name, schema: CvMailBoxSchema },
    ]),
  ],
  controllers: [CvMailboxController],
  providers: [CvMailBoxService]
})
export class CvMailboxModule {}
