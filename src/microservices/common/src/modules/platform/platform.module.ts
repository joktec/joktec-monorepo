import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlatformService } from './platform.service';
import { PlatformController } from './platform.controller';
import { PlatformSchema } from './schemas/platform.schema';
import { NAME } from './platform.constants';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: NAME, schema: PlatformSchema }]),
  ],
  providers: [PlatformService],
  controllers: [PlatformController],
  exports: [PlatformService],
})

export class PlatformModule {}
