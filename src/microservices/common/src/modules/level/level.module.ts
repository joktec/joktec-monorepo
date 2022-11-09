import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LevelService } from './level.service';
import { LevelController } from './level.controller';
import { Level, LevelSchema } from './schemas/level.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Level.name, schema: LevelSchema },
    ]),
  ],
  providers: [LevelService],
  controllers: [LevelController],
  exports: [LevelService],
})
export class LevelModule { }
