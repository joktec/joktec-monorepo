import { CoreModule } from '@joktec/core';
import { MongoModule } from '@joktec/mongo';
import { seeder } from 'nestjs-seeder';
import { UserRepo, UserSeeder } from './modules/users';

seeder({
  imports: [CoreModule, MongoModule],
  providers: [UserRepo],
}).run([UserSeeder]);
