import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobhopPaymentLinkService } from './jobhop-paymentlink.service';
import { JobhopPaymentLinkController } from './jobhop-paymentlink.controller';
import {
  JobhopPaymentLink,
  JobhopPaymentLinkSchema,
} from './schemas/jobhop-paymentlink.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobhopPaymentLink.name,
        schema: JobhopPaymentLinkSchema,
      },
    ]),
  ],
  controllers: [JobhopPaymentLinkController],
  providers: [JobhopPaymentLinkService],
})
export class JobhopPaymentLinkModule {}
