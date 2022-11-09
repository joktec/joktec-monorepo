import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuggestedSkillService } from './suggested-skill.service';
import { SuggestedSkillController } from './suggested-skill.controller';
import { SuggestedSkill, SuggestedSkillSchema } from './schemas/suggested-skill.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SuggestedSkill.name, schema: SuggestedSkillSchema }]),
  ],
  providers: [SuggestedSkillService],
  controllers: [SuggestedSkillController],
  exports: [SuggestedSkillService],
})

export class SuggestedSkillModule { }
