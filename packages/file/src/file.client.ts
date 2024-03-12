import { Client } from '@joktec/core';
import { Magika } from 'magika';
import { FileConfig } from './file.config';

export interface FileClient extends Client<FileConfig, Magika> {
  getSize(conId: string): Promise<number>;

  deleteDir(mkdir: boolean, conId: string): Promise<void>;

  getModifiedFile(start: Date | string, end: Date | string, conId: string): Promise<any>;

  readFile(filename: string, conId: string): Promise<string>;

  appendFile(filename: string, content: string, separator: string, conId: string): Promise<any>;

  deleteFile(filename: string, conId: string): Promise<void>;

  deleteFiles(start: Date | string, end: Date | string, conId: string): Promise<void>;
}
