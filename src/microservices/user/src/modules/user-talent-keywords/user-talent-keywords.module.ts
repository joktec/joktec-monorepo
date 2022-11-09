import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserTalentKeywordService } from './user-talent-keywords.service';
import { UserTalentKeywordController } from './user-talent-keywords.controller';
import {
  UserTalentKeyword,
  UserTalentKeywordSchema,
} from './schemas/user-talent-keywords.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserTalentKeyword.name, schema: UserTalentKeywordSchema },
    ]),
  ],
  providers: [UserTalentKeywordService],
  controllers: [UserTalentKeywordController],
  exports: [UserTalentKeywordService],
})
export class UserTalentKeywordModule {}
