import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserCvTemplateService } from './user-cv-templates.service';
import { UserCvTemplateController } from './user-cv-templates.controller';
import {
  UserCvTemplate,
  UserCvTemplateSchema,
} from './schemas/user-cv-templates.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserCvTemplate.name, schema: UserCvTemplateSchema },
    ]),
  ],
  providers: [UserCvTemplateService],
  controllers: [UserCvTemplateController],
  exports: [UserCvTemplateService],
})
export class UserCvTemplateModule {}
