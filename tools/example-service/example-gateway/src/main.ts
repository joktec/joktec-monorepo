import { Application } from '@jobhopin/core';
import { AppModule } from '@app/app.module';

Application.bootstrap(AppModule, { logger: console });
