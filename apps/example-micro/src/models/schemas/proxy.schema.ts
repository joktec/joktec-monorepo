import { AgentOptions } from 'http';
import { HttpProxyConfig } from '@joktec/http';
import { Prop, Schema } from '@joktec/mongo';
import { BaseSchema } from '../common';
import { ProxyStatus } from '../constants';

@Schema({ collection: 'proxies', paranoid: true })
export class Proxy extends BaseSchema {
  @Prop({ required: true, trim: true })
  host!: string;

  @Prop({ required: true, default: 80 })
  port!: number;

  @Prop({ required: false, default: null })
  username?: string;

  @Prop({ required: false, default: null })
  password?: string;

  @Prop({ required: true, enum: ProxyStatus, default: ProxyStatus.ACTIVATED })
  status!: ProxyStatus;

  get agent(): AgentOptions & HttpProxyConfig {
    const random = Math.floor(Math.random() * 1000) + 1;
    const _agent: AgentOptions & HttpProxyConfig = { host: this.host, port: this.port };
    if (this.username && this.password) {
      _agent.auth = {
        username: `${this.username}-${random}`,
        password: this.password,
      };
    }
    return _agent;
  }
}
