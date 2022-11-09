import { Module } from '@nestjs/common';
import { CvSkillService } from './cv-skill.service';
import { CvSkillController } from './cv-skill.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CvSkill,
  CvSkillSchema,
} from './schemas/cv-skill.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CvSkill.name, schema: CvSkillSchema },
    ]),
  ],
  controllers: [CvSkillController],
  providers: [CvSkillService]
})
export class CvSkillModule {}
