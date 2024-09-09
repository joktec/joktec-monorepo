import { Injectable, NestMiddleware, toInt, resolverLanguage } from '@joktec/core';
import { NextFunction } from 'express';
import { head } from 'lodash';
import { IRequest, IResponse } from '../../app.constant';

@Injectable()
export class HeaderMiddleware implements NestMiddleware {
  use(req: IRequest, res: IResponse, next: NextFunction) {
    req.deviceModel = req.headers['x-device-model'] as string;
    req.deviceOs = req.headers['x-device-os'] as string;
    req.deviceId = req.headers['x-device-id'] as string;
    req.osVersion = req.headers['x-os-version'] as string;
    req.appVersion = req.headers['x-app-version'] as string;
    req.appBuild = toInt(req.headers['x-app-build'] as string, 0);
    if (req.headers['accept-timezone']) req.timezone = req.headers['accept-timezone'] as string;
    if (req.headers['accept-language']) {
      const languages = resolverLanguage(req.headers['accept-language'] as string);
      req.locale = head(languages);
    }
    next();
  }
}
