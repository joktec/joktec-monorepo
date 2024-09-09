import { Module } from '@joktec/core';
import { ArtistController } from './artist.controller';
import { ArtistCronner } from './artist.cronner';
import { ArtistService } from './artist.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, ArtistCronner],
  exports: [ArtistService, ArtistCronner],
})
export class ArtistModule {}
