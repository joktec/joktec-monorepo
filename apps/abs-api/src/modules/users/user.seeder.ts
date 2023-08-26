import { hashPassword, Injectable, sleep } from '@joktec/core';
import { DataFactory, Seeder } from 'nestjs-seeder';
import { User, UserRole } from './models';
import { UserRepo } from './user.repo';

@Injectable()
export class UserSeeder implements Seeder {
  constructor(private userRepo: UserRepo) {}

  async seed(): Promise<any> {
    await sleep(1500);
    const users = DataFactory.createForClass(User).generate(2);
    return Promise.all(
      users.map((user, idx) => {
        return this.userRepo.create({
          ...user,
          role: UserRole.ADMIN,
          email: `admin${idx + 1}@gmail.com`,
          phone: `+8496612345${idx + 1}`,
          hashPassword: hashPassword('passWord123'),
        });
      }),
    );
  }

  async drop(): Promise<any> {
    return this.userRepo.deleteMany({});
  }
}
