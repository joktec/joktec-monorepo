import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountGroupService } from './account-group.service';
import { AccountGroupController } from './account-group.controller';
import {
  AccountGroup,
  AccountGroupSchema,
} from './schemas/account-group.schema';
import { AccountUserGroupModule } from '../account-user-group';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AccountGroup.name, schema: AccountGroupSchema },
    ]),
    AccountUserGroupModule,
  ],
  providers: [AccountGroupService],
  controllers: [AccountGroupController],
  exports: [AccountGroupService],
})
export class AccountGroupModule {}
