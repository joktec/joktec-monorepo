import { Module } from '@nestjs/common';
import { OrganizationLeaderProfileService } from './organization-leader-profile.service';
import { OrganizationLeaderProfileController } from './organization-leader-profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationLeaderProfile, OrganizationLeaderProfileSchema } from './schemas/organization-leader-profile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OrganizationLeaderProfile.name, schema: OrganizationLeaderProfileSchema }]),
  ],
  controllers: [OrganizationLeaderProfileController],
  providers: [OrganizationLeaderProfileService]
})
export class OrganizationLeaderProfileModule {}
