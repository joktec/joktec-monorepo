import { Agent, Device, OperatingSystem } from 'useragent';

export class UserAgentOs extends OperatingSystem {}

export class UserAgentDevice extends Device {}

export class UserAgent extends Agent {
  os: UserAgentOs;
  device: UserAgentDevice;
}
