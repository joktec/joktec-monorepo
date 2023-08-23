import { Controller, Get } from '@joktec/core';
import { FirebaseService } from '@joktec/firebase';

@Controller('firebase')
export class FirebaseController {
  constructor(private firebaseService: FirebaseService) {}

  @Get('/users')
  async getUsers() {
    return this.firebaseService.auth().listUsers(10);
  }
}
