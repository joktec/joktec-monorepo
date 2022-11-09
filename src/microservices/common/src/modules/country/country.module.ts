import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { CountrySchema } from './schemas/country.schema';
import { NAME } from './country.constants';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: NAME, schema: CountrySchema }]),
  ],
  providers: [CountryService],
  controllers: [CountryController],
  exports: [CountryService],
})

export class CountryModule {}
