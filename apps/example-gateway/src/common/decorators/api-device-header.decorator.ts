import { ApiHeader, applyDecorators, createParamDecorator, ExecutionContext, toInt } from '@joktec/core';
import { IRequest } from '../../app.constant';

export interface IDeviceHeader {
  deviceModel: string;
  deviceOs: string;
  deviceId: string;
  osVersion: string;
  appVersion: string;
  appBuild: number;
}

export function ApiDeviceHeaders() {
  return applyDecorators(
    ApiHeader({ name: 'x-device-model', description: 'Device Model' }),
    ApiHeader({ name: 'x-device-os', description: 'Device OS' }),
    ApiHeader({ name: 'x-device-id', description: 'DeviceID' }),
    ApiHeader({ name: 'x-os-version', description: 'OS Version' }),
    ApiHeader({ name: 'x-app-version', description: 'App Version Name' }),
    ApiHeader({ name: 'x-app-build', description: 'App Version Build' }),
  );
}

export const DeviceHeader = createParamDecorator<any, ExecutionContext, IDeviceHeader>(
  (data: any, ctx: ExecutionContext): IDeviceHeader => {
    const req = ctx.switchToHttp().getRequest<IRequest>();
    return {
      deviceModel: req.deviceModel || (req.headers['x-device-model'] as string),
      deviceOs: req.deviceOs || (req.headers['x-device-os'] as string),
      deviceId: req.deviceId || (req.headers['x-device-id'] as string),
      osVersion: req.osVersion || (req.headers['x-os-version'] as string),
      appVersion: req.appVersion || (req.headers['x-app-version'] as string),
      appBuild: req.appBuild || toInt(req.headers['x-app-build'] as string, 0),
    };
  },
);
