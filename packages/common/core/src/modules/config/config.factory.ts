import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { flattenKeys, toBool, toInt } from '@joktec/utils';
import { load } from 'js-yaml';
import { get, isBoolean, isNumber, pick, set, snakeCase } from 'lodash';

export enum ENV {
  DEV = 'develop',
  TESTING = 'testing',
  STAGING = 'staging',
  UAT = 'uat',
  PROD = 'production',
}

export class AppConfig {
  name: string;
  description?: string;
  version: string;
  isProd: boolean;
  env: ENV;

  [key: string]: any;
}

export const initConfig = (
  yamlFile: string = 'config.yml',
  packageFile: string = 'package.json',
  dopplerFile: string = 'doppler.yaml',
): AppConfig => {
  const env: ENV = (process.env['NODE_ENV'] ?? ENV.DEV) as ENV;
  const appCfg = load(readFileSync(yamlFile, 'utf8')) as object;
  const paths: string[] = flattenKeys(appCfg, null).filter(key => !key.startsWith('$'));

  let dopplerSecret: object = {};
  if (existsSync(dopplerFile)) {
    dopplerSecret = JSON.parse(execSync('doppler secrets download --no-file --format json', { encoding: 'utf-8' }));
  }

  for (const path of paths) {
    const envKey: string = snakeCase(path).toUpperCase();
    const originValue = get(appCfg, path);
    let overrideValue = dopplerSecret[envKey] ?? process.env[envKey] ?? originValue;
    if (overrideValue !== originValue) {
      if (isNumber(originValue)) overrideValue = toInt(overrideValue, originValue);
      if (isBoolean(originValue)) overrideValue = toBool(overrideValue, originValue);
    }
    set(appCfg, path, overrideValue);
    process.env[envKey] = overrideValue;
  }

  const pkg = JSON.parse(readFileSync(packageFile, 'utf8'));
  const pkgCfg = pick(pkg, ['name', 'description', 'version']);

  return { env, isProd: env === ENV.PROD, ...appCfg, ...pkgCfg };
};
