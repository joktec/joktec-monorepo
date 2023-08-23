import { Module } from '@joktec/core';
import { FirebaseController } from './firebase.controller';

@Module({
  controllers: [FirebaseController],
})
export class FirebaseExampleModule {}
