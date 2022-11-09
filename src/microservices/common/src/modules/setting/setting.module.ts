import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SettingService } from './setting.service';
import { SettingController } from './setting.controller';
import { SettingSchema } from './schemas/setting.schema';
import { NAME } from './setting.constants';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: NAME, schema: SettingSchema }]),
  ],
  providers: [SettingService],
  controllers: [SettingController],
  exports: [SettingService],
})

export class SettingModule {}
