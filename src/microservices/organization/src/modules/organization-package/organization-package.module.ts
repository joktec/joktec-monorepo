import { Module } from '@nestjs/common';
import { OrganizationPackageService } from './organization-package.service';
import { OrganizationPackageController } from './organization-package.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationPackage, OrganizationPackageSchema } from './schemas/organization-package.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OrganizationPackage.name, schema: OrganizationPackageSchema }]),
  ],
  controllers: [OrganizationPackageController],
  providers: [OrganizationPackageService]
})
export class OrganizationPackageModule {}
