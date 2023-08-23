import { Global, Module } from '@joktec/core';
import { FirebaseService } from './firebase.service';

@Global()
@Module({
  imports: [],
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {}
