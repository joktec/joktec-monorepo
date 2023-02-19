import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, toBool, toInt } from '@baotg/core';

export interface IApnConfig {
  /** The filename of the provider token key (as supplied by Apple) to load from disk, or a String containing the key data. */
  keyProvider: string;
  /** The ID of the key issued by Apple */
  keyId: string;
  /** ID of the team associated with the provider token key */
  teamId: string;
  /** The filename of the connection certificate to load from disk, or a String containing the certificate data. (Defaults to: `cert.pem`) */
  cert?: string;
  /** The filename of the connection key to load from disk, or a String containing the key data. (Defaults to: `key.pem`) */
  key?: string;
  /** An array of trusted certificates. Each element should contain either a filename to load, or a String (in PEM format) to be used directly. If this is omitted several well known "root" CAs will be used. - You may need to use this as some environments don't include the CA used by Apple (entrust_2048). */
  ca?: string[];
  /** File path for private key, certificate and CA certs in PFX or PKCS12 format, or a Buffer containing the PFX data. If supplied will always be used instead of certificate and key above. */
  pfx?: string;
  /** The passphrase for the connection key, if required */
  passphrase?: string;
  /** Specifies which environment to connect to: Production (if true) or Sandbox - The hostname will be set automatically. (Defaults to NODE_ENV == "production", i.e. false unless the NODE_ENV environment variable is set accordingly) */
  production?: boolean;
  /** Reject Unauthorized property to be passed through to tls.connect() (Defaults to `true`) */
  rejectUnauthorized?: boolean;
  /** The maximum number of connection failures that will be tolerated before `apn` will "terminate". (Defaults to: 3) */
  connectionRetryLimit?: number;
}

export class ApnConfig implements IApnConfig {
  @IsString()
  @IsNotEmpty()
  keyProvider!: string;

  @IsString()
  @IsNotEmpty()
  keyId!: string;

  @IsString()
  @IsNotEmpty()
  teamId!: string;

  @IsString()
  @IsOptional()
  cert?: string;

  @IsString()
  @IsOptional()
  key?: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  ca?: string[];

  @IsString()
  @IsOptional()
  pfx?: string;

  @IsString()
  @IsOptional()
  passphrase?: string;

  @IsBoolean()
  @IsOptional()
  production?: boolean;

  @IsBoolean()
  @IsOptional()
  rejectUnauthorized?: boolean;

  @IsNumber()
  @IsOptional()
  connectionRetryLimit?: number;

  constructor(props: IApnConfig) {
    Object.assign(this, {
      ...props,
      production: toBool(props.production, process.env['NODE_ENV'] === 'production'),
      rejectUnauthorized: toBool(props.rejectUnauthorized, false),
      connectionRetryLimit: toInt(props.connectionRetryLimit, 3),
    });
  }
}
