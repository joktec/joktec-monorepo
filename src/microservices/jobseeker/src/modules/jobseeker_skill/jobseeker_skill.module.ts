import { Module } from '@nestjs/common';
import { JobseekerSkillService } from './jobseeker_skill.service';
import { JobseekerSkillController } from './jobseeker_skill.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  JobseekerSkill,
  JobseekerSkillSchema,
} from './schemas/jobseeker_skill.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobseekerSkill.name, schema: JobseekerSkillSchema },
    ]),
  ],
  controllers: [JobseekerSkillController],
  providers: [JobseekerSkillService]
})
export class JobseekerSkillModule {}
