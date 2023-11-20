import { EscapeCallback, IncluderCallback } from 'ejs';
import { MailerEngine } from '../mailer.config';

export interface HandlebarOptions {
  engine: MailerEngine.HBS;
  data?: boolean;
  compat?: boolean;
  knownHelpersOnly?: boolean;
  noEscape?: boolean;
  strict?: boolean;
  assumeObjects?: boolean;
  preventIndent?: boolean;
  ignoreStandalone?: boolean;
  explicitPartialContext?: boolean;
}

export interface PugOptions {
  engine: MailerEngine.PUG;
  filename?: string;
  basedir?: string;
  doctype?: string;
  pretty?: boolean | string;
  filters?: any;
  self?: boolean;
  debug?: boolean;
  compileDebug?: boolean;
  globals?: Array<string>;
  cache?: boolean;
  inlineRuntimeFunctions?: boolean;
  name?: string;
}

export interface EjsOptions {
  engine: MailerEngine.EJS;
  debug?: boolean;
  compileDebug?: boolean;
  _with?: boolean;
  strict?: boolean;
  destructuredLocals?: string[];
  rmWhitespace?: boolean;
  client?: boolean;
  escape?: EscapeCallback;
  filename?: string;
  root?: string[] | string;
  openDelimiter?: string;
  closeDelimiter?: string;
  delimiter?: string;
  cache?: boolean;
  context?: any;
  async?: boolean;
  beautify?: boolean;
  localsName?: string;
  outputFunctionName?: string;
  views?: string[];
  includer?: IncluderCallback;
}
