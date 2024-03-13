import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { load } from 'js-yaml';
import { get, isBoolean, isNumber, pick, set, snakeCase } from 'lodash';
import { flattenKeys, toBool, toInt } from '../../utils';

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

const YAML_CONFIG_FILENAME: string = 'config.yml';
const PACKAGE_CONFIG_FILENAME: string = 'package.json';
const DOPPLER_CONFIG_FILENAME: string = 'doppler.yaml';

export const initConfig = (): AppConfig => {
  const env: ENV = (process.env['NODE_ENV'] ?? ENV.DEV) as ENV;
  const appCfg = load(readFileSync(YAML_CONFIG_FILENAME, 'utf8')) as object;
  const paths: string[] = flattenKeys(appCfg, null).filter(key => !key.startsWith('$'));

  let dopplerSecret: object = {};
  if (existsSync(DOPPLER_CONFIG_FILENAME)) {
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
    process.env[envKey] = get(appCfg, path);
  }

  const pkg = JSON.parse(readFileSync(PACKAGE_CONFIG_FILENAME, 'utf8'));
  const pkgCfg = pick(pkg, ['name', 'description', 'version']);

  return { env, isProd: env === ENV.PROD, ...appCfg, ...pkgCfg };
};
