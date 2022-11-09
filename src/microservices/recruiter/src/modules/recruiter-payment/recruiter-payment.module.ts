import {
  RecruiterPayment,
  RecruiterPaymentSchema,
} from './schemas/recruiter-payment.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { RecruiterPaymentService } from './recruiter-payment.service';
import { RecruiterPaymentController } from './recruiter-payment.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RecruiterPayment.name,
        schema: RecruiterPaymentSchema,
      },
    ]),
  ],
  controllers: [RecruiterPaymentController],
  providers: [RecruiterPaymentService],
})
export class RecruiterPaymentModule {}
