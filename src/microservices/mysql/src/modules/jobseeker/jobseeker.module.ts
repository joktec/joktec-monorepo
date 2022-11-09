import { UsersModule } from './../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JobseekerService } from './jobseeker.service';
import { JobseekerController } from './jobseeker.controller';
import { Jobseeker } from './entities/jobseeker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Jobseeker]), UsersModule],
  controllers: [JobseekerController],
  providers: [JobseekerService],
  exports: [JobseekerService],
})
export class JobseekerModule {}
