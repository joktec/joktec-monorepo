import { Module } from '@nestjs/common';
import { OrganizationSizeService } from './organization-size.service';
import { OrganizationSizeController } from './organization-size.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationSize, OrganizationSizeSchema } from './schemas/organization-size.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OrganizationSize.name, schema: OrganizationSizeSchema }]),
  ],
  controllers: [OrganizationSizeController],
  providers: [OrganizationSizeService]
})
export class OrganizationSizeModule {}
