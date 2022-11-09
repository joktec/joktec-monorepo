import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserActivationService } from './user-activations.service';
import { UserActivationController } from './user-activations.controller';
import {
  UserActivation,
  UserActivationSchema,
} from './schemas/user-activations.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserActivation.name, schema: UserActivationSchema },
    ]),
  ],
  providers: [UserActivationService],
  controllers: [UserActivationController],
  exports: [UserActivationService],
})
export class UserActivationModule {}
