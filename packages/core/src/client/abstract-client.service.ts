import { Inject, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '../config';
import { LogService } from '../log';
import { toArray } from '../utils';
import { isEmpty } from 'lodash';
import { ClientConfig, DEFAULT_CON_ID } from './client.config';
import { Client } from './client';
import { InvalidClientConfigException } from './client.exception';
import mergeDeep from 'merge-deep';
import { ExceptionMessage } from '../exceptions';
import { Constructor } from '../models';

export abstract class AbstractClientService<IConfig extends ClientConfig, IClient = any>
  implements Client<IConfig, IClient>, OnModuleInit, OnModuleDestroy
{
  private configs: { [conId: string]: IConfig } = {};
  private clients: { [conId: string]: IClient } = {};

  @Inject() protected configService: ConfigService;
  @Inject() protected logService: LogService;

  protected constructor(protected service: string, protected configClass: Constructor<IConfig>) {}

  async onModuleInit(): Promise<void> {
    this.logService.setContext(this.constructor.name);
    const config: IConfig = this.configService.get<IConfig>(this.service);

    if (isEmpty(config)) {
      this.logService.warn('%s service not found config!', this.service);
    }

    const configList: IConfig[] = toArray<IConfig>(config);
    for (const cfg of configList) {
      const inheritConfig = cfg.inherit ? configList[0] : {};
      await this.clientInit(mergeDeep({}, inheritConfig, cfg));
    }
  }

  protected async clientInit(config: IConfig, first: boolean = true) {
    const { conId = DEFAULT_CON_ID } = config;
    const beginMessage = first ? 'initializing...' : 're-initializing...';
    const endMessage = first ? 'initialized' : 're-initialized';

    this.configs[conId] = this.validateConfig(config);

    this.logService.debug('`%s` %s is %s', conId, this.service, beginMessage);
    this.clients[conId] = await this.init(this.configs[conId]);
    this.logService.debug('`%s` %s %s with config:\n%j', conId, this.service, endMessage, this.configs[conId]);

    await this.start(this.clients[conId], conId);
  }

  private validateConfig(config: IConfig): IConfig {
    const cfg = new this.configClass(config);
    const error = cfg.validate();
    if (error?.length) {
      this.logService.error(error, `${this.service} invalid config`);
      throw new InvalidClientConfigException(ExceptionMessage.INVALID_CLIENT_CONFIG, error);
    }
    return cfg;
  }

  onModuleDestroy() {
    Object.values(this.clients).forEach(client => this.stop(client));
  }

  getConfig(conId = DEFAULT_CON_ID): IConfig {
    return this.configs[conId];
  }

  getClient(conId = DEFAULT_CON_ID): IClient {
    return this.clients[conId];
  }

  protected abstract init(config: IConfig): Promise<IClient>;

  protected abstract start(client: IClient, conId?: string): Promise<void>;

  protected abstract stop(client: IClient, conId?: string): Promise<void>;
}
