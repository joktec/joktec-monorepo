import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HeadcountService } from './headcount.service';
import { HeadcountController } from './headcount.controller';
import { Headcount, HeadcountSchema } from './schemas/headcount.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Headcount.name, schema: HeadcountSchema },
    ]),
  ],
  providers: [HeadcountService],
  controllers: [HeadcountController],
  exports: [HeadcountService],
})
export class HeadcountModule {}
