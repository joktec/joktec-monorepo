import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DegreeService } from './degree.service';
import { DegreeController } from './degree.controller';
import { DegreeSchema } from './schemas/degree.schema';
import { NAME } from './degree.constants';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: NAME, schema: DegreeSchema }]),
  ],
  providers: [DegreeService],
  controllers: [DegreeController],
  exports: [DegreeService],
})

export class DegreeModule {}
