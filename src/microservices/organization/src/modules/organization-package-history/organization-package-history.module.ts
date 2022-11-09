import { Module } from '@nestjs/common';
import { OrganizationPackageHistoryService } from './organization-package-history.service';
import { OrganizationPackageHistoryController } from './organization-package-history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationPackageHistory, OrganizationPackageHistorySchema } from './schemas/organization-package-history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OrganizationPackageHistory.name, schema: OrganizationPackageHistorySchema }]),
  ],
  controllers: [OrganizationPackageHistoryController],
  providers: [OrganizationPackageHistoryService]
})
export class OrganizationPackageHistoryModule {}
