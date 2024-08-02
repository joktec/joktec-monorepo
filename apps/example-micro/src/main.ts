import { Application, ConfigService, ExceptionFilter, LogService } from '@joktec/core';
import { AppModule } from './app.module';
import { CustomExceptionFilter } from './common';

Application.bootstrap(AppModule, {
  filters: async (app): Promise<ExceptionFilter[]> => {
    const config = app.get(ConfigService);
    const logger = await app.resolve(LogService);
    return [new CustomExceptionFilter(config, logger)];
  },
});
