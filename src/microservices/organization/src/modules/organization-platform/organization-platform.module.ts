import { Module } from '@nestjs/common';
import { OrganizationPlatformService } from './organization-platform.service';
import { OrganizationPlatformController } from './organization-platform.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationPlatform, OrganizationPlatformSchema } from './schemas/organization-platform.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OrganizationPlatform.name, schema: OrganizationPlatformSchema }]),
  ],
  controllers: [OrganizationPlatformController],
  providers: [OrganizationPlatformService]
})
export class OrganizationPlatformModule {}
