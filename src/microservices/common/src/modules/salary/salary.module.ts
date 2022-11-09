import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SalaryService } from './salary.service';
import { SalaryController } from './salary.controller';
import { Salary, SalarySchema } from './schemas/salary.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Salary.name, schema: SalarySchema },
    ]),
  ],
  providers: [SalaryService],
  controllers: [SalaryController],
  exports: [SalaryService],
})
export class SalaryModule { }
