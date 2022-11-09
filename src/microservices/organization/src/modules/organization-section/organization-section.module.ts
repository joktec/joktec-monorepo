import { Module } from '@nestjs/common';
import { OrganizationSectionService } from './organization-section.service';
import { OrganizationSectionController } from './organization-section.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationSection, OrganizationSectionSchema } from './schemas/organization-section.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OrganizationSection.name, schema: OrganizationSectionSchema }]),
  ],
  controllers: [OrganizationSectionController],
  providers: [OrganizationSectionService]
})
export class OrganizationSectionModule {}
