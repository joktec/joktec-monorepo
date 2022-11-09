import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HighlightCompanyService } from './highlight-company.service';
import { HighlightCompanyController } from './highlight-company.controller';
import {
  HighlightCompany,
  HighlightCompanySchema,
} from './schemas/highlight-company.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HighlightCompany.name, schema: HighlightCompanySchema },
    ]),
  ],
  providers: [HighlightCompanyService],
  controllers: [HighlightCompanyController],
  exports: [HighlightCompanyService],
})
export class HighlightCompanyModule {}
