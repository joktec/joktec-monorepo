import { Inject, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '../config';
import { LogService } from '../log';
import { toArray } from '../utils';
import { isEmpty } from 'lodash';
import { ClientConfig, DEFAULT_CON_ID } from './client.config';
import { Client } from './client';
import { InvalidClientConfigException } from './errors';

export abstract class AbstractClientService<Config extends ClientConfig, C = any>
  implements Client<Config, C>, OnModuleInit, OnModuleDestroy
{
  private configs: { [conId: string]: Config } = {};
  private clients: { [conId: string]: C } = {};

  @Inject() protected configService: ConfigService;
  @Inject() protected logService: LogService;

  protected constructor(protected service: string, protected configClass: new (props: Config) => Config) {}

  async onModuleInit(): Promise<void> {
    this.logService.setContext(this.constructor.name);
    const config = this.configService.get(this.service);
    if (isEmpty(config)) {
      this.logService.warn('%s service not found config!', this.service);
    }
    for (const cfg of toArray(config)) await this.clientInit(cfg);
  }

  protected async clientInit(config: Config, first: boolean = true) {
    const { conId = DEFAULT_CON_ID } = config;
    const beginMessage = first ? 'initializing...' : 're-initializing...';
    const endMessage = first ? 'initialized' : 're-initialized';

    this.configs[conId] = this.validateConfig(config);

    this.logService.debug('`%s` %s is %s', conId, this.service, beginMessage);
    this.clients[conId] = await this.init(this.configs[conId]);
    this.logService.debug('`%s` %s %s with config:\n%j', conId, this.service, endMessage, this.configs[conId]);

    await this.start(this.clients[conId], conId);
  }

  private validateConfig(config: Config): Config {
    const cfg = new this.configClass(config);

    const error = cfg.validate();
    if (error?.length) {
      this.logService.error(error, `${this.service} invalid config`);
      throw new InvalidClientConfigException('Invalid Config', error);
    }

    return cfg;
  }

  onModuleDestroy() {
    Object.values(this.clients).forEach(client => this.stop(client));
  }

  getConfig(conId = DEFAULT_CON_ID): Config {
    return this.configs[conId];
  }

  getClient(conId = DEFAULT_CON_ID): C {
    return this.clients[conId];
  }

  protected abstract init(config: Config): Promise<C>;

  protected abstract stop(client: C, conId?: string): Promise<void>;

  protected abstract start(client: C, conId?: string): Promise<void>;
}
