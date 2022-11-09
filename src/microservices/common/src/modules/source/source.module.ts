import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SourceService } from './source.service';
import { SourceController } from './source.controller';
import { SourceSchema } from './schemas/source.schema';
import { NAME } from './source.constants';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: NAME, schema: SourceSchema }]),
  ],
  providers: [SourceService],
  controllers: [SourceController],
  exports: [SourceService],
})

export class SourceModule {}
