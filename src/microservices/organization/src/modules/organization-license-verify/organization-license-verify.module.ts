import { Module } from '@nestjs/common';
import { OrganizationLicenseVerifyService } from './organization-license-verify.service';
import { OrganizationLicenseVerifyController } from './organization-license-verify.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationLicenseVerify, OrganizationLicenseVerifySchema } from './schemas/organization-license-verify.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OrganizationLicenseVerify.name, schema: OrganizationLicenseVerifySchema }]),
  ],
  controllers: [OrganizationLicenseVerifyController],
  providers: [OrganizationLicenseVerifyService]
})
export class OrganizationLicenseVerifyModule {}
