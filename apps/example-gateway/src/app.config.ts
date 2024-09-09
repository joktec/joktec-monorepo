import { AppConfig as CoreConfig, initConfig } from '@joktec/core';

export class AppMisc {
  cdnUrl?: string;
  resizeUrl?: string;
}

export class AppConfig extends CoreConfig {
  misc: AppMisc;

  constructor(props?: Partial<AppConfig>) {
    super();
    Object.assign(this, props);
  }
}

export let appConfig: AppConfig = new AppConfig();

export const appConfigFactory = (): AppConfig => {
  appConfig = new AppConfig(initConfig());
  return appConfig;
};
