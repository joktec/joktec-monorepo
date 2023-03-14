<div align="center">
  <h1>@joktec/mongo</h1>
  <p>A NestJS library that provides a wrapper around the `mongoose` and `@typegoose/typegoose` libraries for MongoDB.</p>
</div>

## Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Getting Started](#getting-started)
4. [Reference](#reference)
5. [Contributing](#contributing)

## Introduction
This library provides an easy-to-use interface for working with MongoDB in NestJS applications. It is built on top of the popular `mongoose` and `@typegoose/typegoose` libraries, and provides a set of convenient abstractions for working with these libraries.

## Installation
To install this library, use either `npm` or `yarn`:

```bash
npm install -S @joktec/core @joktec/mongo
# or
yarn add -S @joktec/core @joktec/mongo
```

## Getting Started
### Configuration
To use this library, you must first provide the necessary configuration. This can be done by creating a config.yml file in your application's root directory, with the following content:
```yaml
mongo:
  host: localhost
  port: 27017
  user: my_user
  password: my_pass
  database: my_database
```
Replace the values with your actual database connection information.

### Module
Once you have provided the configuration, you can import the `MongoModule` in your `AppModule`:
```typescript
import { CoreModule, Module } from '@joktec/core';
import { MongoModule } from '@joktec/mongo';

@Module({
  imports: [CoreModule, MongoModule],
})
export class AppModule {}
```

### Service
You can then use the MongoService to interact with the database:
```typescript
import { Injectable } from '@joktec/core';
import { MongoService } from '@joktec/mongo';

@Injectable()
export class UserService {
  constructor(private readonly mongoService: MongoService) {}

  async getUsers() {
    const users = await this.mongoService.getModel(User).findAll();
    return users;
  }
}
```

### Repository
#### Define a Model
You can define a model using `@joktec/mongo` (based on interface of `@typegoose/typegoose`):
```typescript
import { modelOptions, mongoose, prop } from '@joktec/mongo';

@modelOptions({ schemaOptions: { collection: 'users' } })
export class User {
  @prop({ auto: true, immutable: true })
  public _id?: mongoose.Types.ObjectId;

  @prop()
  firstName: string;
}
```

#### Define a Repository
You can create a repository for your model by extending the MongoRepository class and providing the model type as a generic argument:
```typescript
import { Injectable } from '@joktec/core';
import { MongoRepository } from '@joktec/mongo';
import { User } from './user.model';

@Injectable()
export class UserRepository extends MongoRepository<User> {}
```

#### Using Repository in Service
You can then use the repository in your service:
```typescript
import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async getUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }
}
```

## Reference
[mongoose](https://mongoosejs.com/docs/guide.html)

[@typegoose/typegoose](https://typegoose.github.io/typegoose/docs/guides/quick-start-guide)

## Contributing
Contributions to `@joktec/mongo` are welcome. If you would like to contribute, please fork the repository, make your changes, and submit a pull request. 

Please make sure to update tests as appropriate.
