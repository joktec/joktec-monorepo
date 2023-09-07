import { repl } from '@joktec/core';
import { AppModule } from './app.module';

async function bootstrap() {
  await repl(AppModule);
}

bootstrap();
