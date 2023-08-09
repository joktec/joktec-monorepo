import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { safeLoad } from 'js-yaml';
import { get, pick, set, snakeCase } from 'lodash';
import { flattenKeys } from '../utils';

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
}

const YAML_CONFIG_FILENAME: string = 'config.yml';
const PACKAGE_CONFIG_FILENAME: string = 'package.json';
const DOPPLER_CONFIG_FILENAME: string = 'doppler.yaml';

export const initConfig = (): AppConfig => {
  const env: ENV = (process.env['NODE_ENV'] ?? ENV.DEV) as ENV;
  const appCfg = safeLoad(readFileSync(YAML_CONFIG_FILENAME, 'utf8')) as object;
  const paths: string[] = flattenKeys(appCfg, null);

  let dopplerSecret: object = {};
  if (existsSync(DOPPLER_CONFIG_FILENAME)) {
    dopplerSecret = JSON.parse(execSync('doppler secrets download --no-file --format json', { encoding: 'utf-8' }));
  }

  for (const path of paths) {
    const envKey: string = snakeCase(path).toUpperCase();
    const overrideValue = dopplerSecret[envKey] ?? process.env[envKey] ?? get(appCfg, path);
    set(appCfg, path, overrideValue);
    process.env[envKey] = get(appCfg, path);
  }

  const pkg = JSON.parse(readFileSync(PACKAGE_CONFIG_FILENAME, 'utf8'));
  const pkgCfg = pick(pkg, ['name', 'description', 'version']);

  return { env, isProd: env === ENV.PROD, ...appCfg, ...pkgCfg };
};
