<div align="center">
  <h1>@joktec/mysql</h1>
  <p>A NestJS library that provides a wrapper around the `sequelize` and `sequelize-typescript` libraries for MySQL databases.</p>
</div>

## Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Getting Started](#getting-started)
4. [Reference](#reference)
5. [Contributing](#contributing)

## Introduction
This library provides an easy-to-use interface for working with MySQL databases in NestJS applications. It is built on top of the popular `sequelize` and `sequelize-typescript` libraries, and provides a set of convenient abstractions for working with these libraries.

## Installation
To install this library, use either `npm` or `yarn`:

```bash
npm install @joktec/mysql
# or
yarn add @joktec/mysql
```

## Getting Started
### Configuration
To use this library, you must first provide the necessary configuration. This can be done by creating a config.yml file in your application's root directory, with the following content:
```yaml
mysql:
  host: localhost
  port: 3306
  user: my_user
  password: my_pass
  database: my_database
```
Replace the values with your actual database connection information.

### Module
Once you have provided the configuration, you can create a MysqlModule in your NestJS application:
```typescript
import { CoreModule, Module } from '@joktec/core';
import { MysqlModule } from '@joktec/mysql';

@Module({
  imports: [CoreModule, MysqlModule],
})
export class AppModule {}
```

### Service
You can then use the MysqlService to interact with the database:
```typescript
import { Injectable } from '@joktec/core';
import { MysqlService } from '@joktec/mysql';

@Injectable()
export class UserService {
  constructor(private readonly mysqlService: MysqlService) {}

  async getUsers() {
    const users = await this.mysqlService.getModel(User).findAll();
    return users;
  }
}
```

### Repository
#### Define a Model
You can define a model using `@joktec/mysql` (based on interface of `sequelize-typescript`):
```typescript
import { Table, Column, Model } from '@joktec/mysql';

@Table
export class User extends Model<User> {
  @Column
  name: string;

  @Column
  email: string;
}
```

#### Define a Repository
You can create a repository for your model by extending the MysqlRepository class and providing the model type as a generic argument:
```typescript
import { Injectable } from '@nestjs/common';
import { MysqlRepository } from '@joktec/mysql';
import { User } from './user.model';

@Injectable()
export class UserRepository extends MysqlRepository<User> {}
```
#### Using Repository in Service
You can then use the repository in your service:
```typescript
import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }
}
```

## Reference
[sequelize](https://www.npmjs.com/package/sequelize)

[sequelize-typescript](https://www.npmjs.com/package/sequelize-typescript)

## Contributing
Contributions to `@joktec/mysql` are welcome. If you would like to contribute, please fork the repository, make your changes, and submit a pull request.

Please make sure to update tests as appropriate.
