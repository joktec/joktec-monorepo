import { pick, snakeCase, set, get } from 'lodash';
import { readFileSync } from 'fs';
import { safeLoad } from 'js-yaml';
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

const YAML_CONFIG_FILENAME = 'config.yml';
const PACKAGE_CONFIG_FILENAME = 'package.json';

export const initConfig = (): AppConfig => {
  const env: ENV = (process.env['NODE_ENV'] ?? ENV.DEV) as ENV;
  const appCfg = safeLoad(readFileSync(YAML_CONFIG_FILENAME, 'utf8')) as object;
  const paths: string[] = flattenKeys(appCfg, null);

  for (const path of paths) {
    const envKey: string = snakeCase(path).toUpperCase();
    set(appCfg, path, process.env[envKey] ?? get(appCfg, path));
    process.env[envKey] = get(appCfg, path);
  }

  const pkg = JSON.parse(readFileSync(PACKAGE_CONFIG_FILENAME, 'utf8'));
  const pkgCfg = pick(pkg, ['name', 'description', 'version']);

  return { env, isProd: env === ENV.PROD, ...appCfg, ...pkgCfg };
};
