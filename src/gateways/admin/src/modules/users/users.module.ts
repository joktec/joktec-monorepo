import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import {
  parseListQueryMiddleware,
  parseQueryMiddleware,
  UserMicroserviceConfig,
} from '@baotg/core';
import { UserController } from './users.controller';

import { PLURAL_NAME } from './users.constants';

const userMicroserviceConfig = new UserMicroserviceConfig();
@Module({
  imports: [
    ClientsModule.register([
      {
        name: userMicroserviceConfig.name,
        ...userMicroserviceConfig.microserviceOptions,
      },
    ]),
  ],
  controllers: [UserController],
  exports: [],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(parseListQueryMiddleware)
      .forRoutes({ path: `/${PLURAL_NAME}`, method: RequestMethod.GET });
    consumer
      .apply(parseQueryMiddleware)
      .forRoutes({ path: `/${PLURAL_NAME}/:id`, method: RequestMethod.GET });
  }
}
