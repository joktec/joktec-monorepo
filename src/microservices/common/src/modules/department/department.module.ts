import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { DepartmentSchema } from './schemas/department.schema';
import { NAME } from './department.constants';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: NAME, schema: DepartmentSchema }]),
  ],
  providers: [DepartmentService],
  controllers: [DepartmentController],
  exports: [DepartmentService],
})

export class DepartmentModule {}
