import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IndustryService } from './industry.service';
import { IndustryController } from './industry.controller';
import { IndustrySchema } from './schemas/industry.schema';
import { NAME } from './industry.constants';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: NAME, schema: IndustrySchema }]),
  ],
  providers: [IndustryService],
  controllers: [IndustryController],
  exports: [IndustryService],
})
export class IndustryModule {}
