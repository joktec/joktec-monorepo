import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyTypeService } from './company-type.service';
import { CompanyTypeController } from './company-type.controller';
import { CompanyType, CompanyTypeSchema } from './schemas/company-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CompanyType.name, schema: CompanyTypeSchema },
    ]),
  ],
  providers: [CompanyTypeService],
  controllers: [CompanyTypeController],
  exports: [CompanyTypeService],
})
export class CompanyTypeModule {}
