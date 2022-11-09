import { Module } from '@nestjs/common';
import { OrganizationSimilarCompanyService } from './organization-similar-company.service';
import { OrganizationSimilarCompanyController } from './organization-similar-company.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationSimilarCompany, OrganizationSimilarCompanySchema } from './schemas/organization-similar-company.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OrganizationSimilarCompany.name, schema: OrganizationSimilarCompanySchema }]),
  ],
  controllers: [OrganizationSimilarCompanyController],
  providers: [OrganizationSimilarCompanyService]
})
export class OrganizationSimilarCompanyModule {}
