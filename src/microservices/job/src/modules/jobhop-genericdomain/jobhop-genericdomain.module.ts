import {
  JobhopGenericDomain,
  JobhopGenericDomainSchema,
} from './schemas/jobhop-genericdomain.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobhopGenericDomainService } from './jobhop-genericdomain.service';
import { JobhopGenericDomainController } from './jobhop-genericdomain.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobhopGenericDomain.name,
        schema: JobhopGenericDomainSchema,
      },
    ]),
  ],
  controllers: [JobhopGenericDomainController],
  providers: [JobhopGenericDomainService],
})
export class JobhopGenericDomainModule {}
