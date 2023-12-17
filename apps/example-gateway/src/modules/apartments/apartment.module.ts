import { Module } from '@joktec/core';
import { ApartmentController } from './apartment.controller';
import { ApartmentRepo } from './apartment.repo';
import { ApartmentService } from './apartment.service';

@Module({
  controllers: [ApartmentController],
  providers: [ApartmentRepo, ApartmentService],
  exports: [ApartmentRepo, ApartmentService],
})
export class ApartmentModule {}
