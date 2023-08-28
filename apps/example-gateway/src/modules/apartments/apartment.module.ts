import { Module } from '@joktec/core';
import { ApartmentController } from './apartment.controller';
import { ApartmentRepo } from './apartment.repo';
import { ApartmentService } from './apartment.service';
import { ApartmentInterceptor } from './hooks';

@Module({
  controllers: [ApartmentController],
  providers: [ApartmentRepo, ApartmentService, ApartmentInterceptor],
  exports: [ApartmentRepo, ApartmentService],
})
export class ApartmentModule {}
