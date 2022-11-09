import { Module } from '@nestjs/common';
import { OrganizationInsiderService } from './organization-insider.service';
import { OrganizationInsiderController } from './organization-insider.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationInsider, OrganizationInsiderSchema } from './schemas/organization-insider.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OrganizationInsider.name, schema: OrganizationInsiderSchema }]),
  ],
  controllers: [OrganizationInsiderController],
  providers: [OrganizationInsiderService]
})
export class OrganizationInsiderModule {}
