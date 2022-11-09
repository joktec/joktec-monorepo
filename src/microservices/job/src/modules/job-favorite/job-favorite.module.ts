import { JobFavorite, JobFavoriteSchema } from './schemas/job-favorite.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobFavoriteService } from './job-favorite.service';
import { JobFavoriteController } from './job-favorite.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobFavorite.name, schema: JobFavoriteSchema },
    ]),
  ],
  controllers: [JobFavoriteController],
  providers: [JobFavoriteService],
})
export class JobFavoriteModule {}
