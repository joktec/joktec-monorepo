import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountUserGroupService } from './account-user-group.service';
import { AccountUserGroupController } from './account-user-group.controller';
import {
  AccountUserGroup,
  AccountUserGroupSchema,
} from './schemas/account-user-group.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AccountUserGroup.name, schema: AccountUserGroupSchema },
    ]),
  ],
  providers: [AccountUserGroupService],
  controllers: [AccountUserGroupController],
  exports: [AccountUserGroupService],
})
export class AccountUserGroupModule {}
