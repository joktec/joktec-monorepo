import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UniversityService } from './university.service';
import { UniversityController } from './university.controller';
import { UniversitySchema } from './schemas/university.schema';
import { NAME } from './university.constants';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: NAME, schema: UniversitySchema }]),
  ],
  providers: [UniversityService],
  controllers: [UniversityController],
  exports: [UniversityService],
})

export class UniversityModule {}
