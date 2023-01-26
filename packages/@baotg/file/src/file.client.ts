import { Client } from '@baotg/core';
import { FileConfig } from './file.config';

export interface FileClient extends Client<FileConfig, any> {
  getModifiedFile(start: Date | string, end: Date | string, conId: string): Promise<any>;

  readFile(fileName: string, conId: string): Promise<string>;

  appendFile(fileName: string, content: string, separator: string, conId: string): Promise<any>;
}
