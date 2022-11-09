import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserActionService } from './user-actions.service';
import { UserActionController } from './user-actions.controller';
import { UserAction, UserActionSchema } from './schemas/user-actions.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserAction.name, schema: UserActionSchema },
    ]),
  ],
  providers: [UserActionService],
  controllers: [UserActionController],
  exports: [UserActionService],
})
export class UserActionModule {}
