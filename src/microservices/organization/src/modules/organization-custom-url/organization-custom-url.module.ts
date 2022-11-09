import { Module } from '@nestjs/common';
import { OrganizationCustomUrlService } from './organization-custom-url.service';
import { OrganizationCustomUrlController } from './organization-custom-url.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationCustomUrl, OrganizationCustomUrlSchema } from './schemas/organization-custom-url.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OrganizationCustomUrl.name, schema: OrganizationCustomUrlSchema }]),
  ],
  controllers: [OrganizationCustomUrlController],
  providers: [OrganizationCustomUrlService]
})
export class OrganizationCustomUrlModule {}
