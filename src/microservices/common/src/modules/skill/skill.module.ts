import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { SkillSchema } from './schemas/skill.schema';
import { NAME } from './skill.constants';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: NAME, schema: SkillSchema }]),
  ],
  providers: [SkillService],
  controllers: [SkillController],
  exports: [SkillService],
})

export class SkillModule {}
