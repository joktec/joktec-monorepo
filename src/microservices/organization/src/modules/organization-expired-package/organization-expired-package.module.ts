import { Module } from '@nestjs/common';
import { OrganizationExpiredPackageService } from './organization-expired-package.service';
import { OrganizationExpiredPackageController } from './organization-expired-package.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationExpiredPackage, OrganizationExpiredPackageSchema } from './schemas/organization-expired-package.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OrganizationExpiredPackage.name, schema: OrganizationExpiredPackageSchema }]),
  ],
  controllers: [OrganizationExpiredPackageController],
  providers: [OrganizationExpiredPackageService]
})
export class OrganizationExpiredPackageModule {}
