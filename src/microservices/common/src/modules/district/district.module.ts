import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DistrictService } from './district.service';
import { DistrictController } from './district.controller';
import { DistrictSchema } from './schemas/district.schema';
import { NAME } from './district.constants';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: NAME, schema: DistrictSchema }]),
  ],
  providers: [DistrictService],
  controllers: [DistrictController],
  exports: [DistrictService],
})

export class DistrictModule {}
