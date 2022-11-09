import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LanguageService } from './language.service';
import { LanguageController } from './language.controller';
import { Language, LanguageSchema } from './schemas/language.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Language.name, schema: LanguageSchema },
    ]),
  ],
  providers: [LanguageService],
  controllers: [LanguageController],
  exports: [LanguageService],
})
export class LanguageModule { }
