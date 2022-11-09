import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ThumdownReasonService } from './thumdown-reason.service';
import { ThumdownReasonController } from './thumdown-reason.controller';
import {
  ThumdownReason,
  ThumdownReasonSchema,
} from './schemas/thumdown-reason.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ThumdownReason.name, schema: ThumdownReasonSchema },
    ]),
  ],
  providers: [ThumdownReasonService],
  controllers: [ThumdownReasonController],
  exports: [ThumdownReasonService],
})
export class ThumdownReasonModule {}
