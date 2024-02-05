import fs from 'fs';
import { GrpcOptions as NestGrpcOptions, Transport } from '@nestjs/microservices';
import { IsNotEmpty, IsObject } from 'class-validator';
import glob from 'glob';
import { toInt } from '../../utils';
import { BaseTransport } from './base.transport';

export interface GrpcOptions {
  port?: number;
  filePattern?: string;
  url?: string;
  package?: string | string[];
  protoPath?: string | string[];
  protoLoader?: string;
}

export class GrpcTransport extends BaseTransport {
  @IsNotEmpty()
  @IsObject()
  options: GrpcOptions;

  constructor(props: Partial<GrpcTransport>) {
    super(props);
    Object.assign(this, {
      options: {
        ...props.options,
        port: toInt(props.options?.port),
      },
    });
  }

  getOptions(): NestGrpcOptions {
    // `${config.get('env') == ENV.DEV ? 'src' : 'dist'}/**/*.proto`; // TODO: env
    const filePattern = this.options.filePattern ?? `src/**/*.proto`;
    const protoPath = glob.sync(filePattern);
    const packages = protoPath.map(
      file =>
        fs
          .readFileSync(file)
          .toString()
          .match(/package (.*);/)[1],
    );
    return {
      transport: Transport.GRPC,
      options: {
        ...this.options,
        package: this.options.package || packages,
        url: this.options.url || `0:0:0:0:${this.options.port}`,
        protoPath: this.options.protoPath || protoPath,
      },
    };
  }
}
