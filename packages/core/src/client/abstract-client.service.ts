import { Inject, OnApplicationBootstrap, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { isEmpty } from 'lodash';
import mergeDeep from 'merge-deep';
import { ExceptionMessage, InternalServerException } from '../exceptions';
import { Constructor } from '../models';
import { ConfigService, LogService } from '../modules';
import { sleep, toArray } from '../utils';
import { Client } from './client';
import { ClientConfig, DEFAULT_CON_ID } from './client.config';
import { InvalidClientConfigException } from './client.exception';

export abstract class AbstractClientService<IConfig extends ClientConfig, IClient = any>
  implements Client<IConfig, IClient>, OnModuleInit, OnApplicationBootstrap, OnModuleDestroy
{
  protected context: string = this.constructor.name;
  private configs: { [conId: string]: IConfig } = {};
  private clients: { [conId: string]: IClient } = {};

  @Inject() protected configService: ConfigService;
  @Inject() protected logService: LogService;

  protected constructor(
    protected service: string,
    protected configClass: Constructor<IConfig>,
  ) {}

  async onModuleInit(): Promise<void> {
    this.logService.setContext(this.context);
  }

  async onApplicationBootstrap(): Promise<void> {
    const config: IConfig = this.configService.get<IConfig>(this.service);
    if (isEmpty(config)) {
      this.logService.warn('%s service not found config!', this.service);
    }

    const configList: IConfig[] = toArray<IConfig>(config).map(cfg => new this.configClass(cfg));
    for (const cfg of configList) {
      const inheritConfig = cfg.inherit ? configList[0] : {};
      await this.clientInit(mergeDeep({}, inheritConfig, cfg));
    }
  }

  protected async clientInit(config: IConfig, first: boolean = true) {
    const cfg = new this.configClass(config);
    const { conId = DEFAULT_CON_ID } = cfg;
    const beginMessage = first ? 'initializing...' : 're-initializing...';
    const endMessage = first ? 'initialized' : 're-initialized';

    this.configs[conId] = this.validateConfig(cfg);
    if (!first && this.configs[conId].initTimeout > 0) {
      const second = Math.round(this.configs[conId].initTimeout / 1000);
      this.logService.debug('`%s` %s is delayed after %s second(s)', conId, this.service, second);
      await sleep(this.configs[conId].initTimeout);
    }

    this.logService.debug('`%s` %s is %s', conId, this.service, beginMessage);
    this.clients[conId] = await this.init(this.configs[conId]);
    this.logService.debug(this.configs[conId], '`%s` %s %s with config', conId, this.service, endMessage);

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
    if (!this.configs[conId]) {
      throw new InternalServerException(`\`${this.service}\` config \`${conId}\` does not exist`);
    }
    return this.configs[conId];
  }

  getClient(conId = DEFAULT_CON_ID): IClient {
    if (!this.clients[conId]) {
      throw new InternalServerException(`\`${this.service}\` client \`${conId}\` does not exist`);
    }
    return this.clients[conId];
  }

  setContext(context: string) {
    this.context = context;
    this.logService.setContext(this.context);
  }

  protected abstract init(config: IConfig): Promise<IClient>;

  protected abstract start(client: IClient, conId?: string): Promise<void>;

  protected abstract stop(client: IClient, conId?: string): Promise<void>;
}
