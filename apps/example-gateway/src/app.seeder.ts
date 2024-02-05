import { CoreModule } from '@joktec/core';
import { MongoModule } from '@joktec/mongo';
import { seeder } from 'nestjs-seeder';
import { UserSeeder } from './modules/users';
import { UserRepo } from './repositories';

seeder({
  imports: [CoreModule, MongoModule],
  providers: [UserRepo],
}).run([UserSeeder]);
