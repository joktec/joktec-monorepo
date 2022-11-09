import { Module } from '@nestjs/common';
import { OrganizationPackageLogService } from './organization-package-log.service';
import { OrganizationPackageLogController } from './organization-package-log.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationPackageLog, OrganizationPackageLogSchema } from './schemas/organization-package-log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OrganizationPackageLog.name, schema: OrganizationPackageLogSchema }]),
  ],
  controllers: [OrganizationPackageLogController],
  providers: [OrganizationPackageLogService]
})
export class OrganizationPackageLogModule {}
