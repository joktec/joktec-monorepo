import { Module } from '@nestjs/common';
import { JobseekerLanguageService } from './jobseeker_language.service';
import { JobseekerLanguageController } from './jobseeker_language.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  JobseekerLanguage,
  JobseekerLanguageSchema,
} from './schemas/jobseeker_language.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobseekerLanguage.name, schema: JobseekerLanguageSchema },
    ]),
  ],
  controllers: [JobseekerLanguageController],
  providers: [JobseekerLanguageService]
})
export class JobseekerLanguageModule {}
