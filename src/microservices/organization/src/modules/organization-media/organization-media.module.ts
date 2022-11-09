import { Module } from '@nestjs/common';
import { OrganizationMediaService } from './organization-media.service';
import { OrganizationMediaController } from './organization-media.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationMedia, OrganizationMediaSchema } from './schemas/organization-media.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OrganizationMedia.name, schema: OrganizationMediaSchema }]),
  ],
  controllers: [OrganizationMediaController],
  providers: [OrganizationMediaService]
})
export class OrganizationMediaModule {}
