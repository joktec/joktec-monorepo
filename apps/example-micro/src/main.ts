import { Application } from '@joktec/core';
import { AppModule } from './app.module';

setTimeout(() => Application.bootstrap(AppModule), 5000);

// TODO: Change
