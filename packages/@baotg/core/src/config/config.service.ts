import { Injectable } from '@nestjs/common';
import { ConfigService as JsConfigService } from '@nestjs/config/dist/config.service';

@Injectable()
export class ConfigService extends JsConfigService {}
