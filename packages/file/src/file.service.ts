import fs from 'fs';
import { AbstractClientService, DEFAULT_CON_ID, Injectable } from '@joktec/core';
import moment from 'moment';
import { FileClient } from './file.client';
import { FileConfig } from './file.config';
import { FileMetric } from './file.metric';
const fsUtils = require('nodejs-fs-utils');

@Injectable()
export class FileService extends AbstractClientService<FileConfig, any> implements FileClient {
  constructor() {
    super('file', FileConfig);
  }

  async init(config: FileConfig): Promise<any> {
    return null;
  }

  async start(client: any, conId: string = DEFAULT_CON_ID): Promise<void> {
    const { directory } = this.getConfig(conId);
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
  }

  async stop(client: any): Promise<void> {
    // Do nothing
  }

  async getModifiedFile(start: Date | string, end: Date | string, conId: string = DEFAULT_CON_ID): Promise<any> {
    const { directory } = this.getConfig(conId);
    const fileNames = await fs.promises.readdir(directory);

    const files = fileNames?.reduce((files, fileName) => {
      const mtime = moment(fs.statSync(directory + fileName).mtime);

      if (mtime > moment(start) && mtime < moment(end)) {
        files.push({ [fileName]: mtime.toISOString() });
      }

      return files;
    }, []);

    return { files, total: files.length };
  }

  async getSize(conId: string = DEFAULT_CON_ID) {
    const { directory } = this.getConfig(conId);
    return new Promise((resolve, reject) => {
      fsUtils.fsize(directory, function (err, size) {
        if (err) return reject(err);
        resolve(size);
      });
    });
  }

  async deleteDir(mkdir: boolean = false, conId: string = DEFAULT_CON_ID) {
    const { directory } = this.getConfig(conId);
    return new Promise((resolve, reject) => {
      fsUtils.rmdirs(directory, function (err) {
        if (err) return reject(err);
        if (mkdir) fs.mkdirSync(directory, { recursive: true });
        resolve(true);
      });
    });
  }

  @FileMetric()
  readFile(fileName: string, conId: string = DEFAULT_CON_ID): Promise<string> {
    const { directory } = this.getConfig(conId);
    const path = directory + fileName;
    return fs.promises.readFile(path, 'utf8');
  }

  @FileMetric()
  appendFile(
    fileName: string,
    content: string,
    separator: string = ' ',
    conId: string = DEFAULT_CON_ID,
  ): Promise<void> {
    const { directory } = this.getConfig(conId);
    const path = directory + fileName;
    return fs.promises.appendFile(path, content + separator);
  }

  public async deleteFile(fileName: string, conId: string = DEFAULT_CON_ID): Promise<void> {
    const { directory } = this.getConfig(conId);
    const path = directory + fileName;

    return fs.promises.unlink(path);
  }

  public async deleteFiles(start: Date | string, end: Date | string, conId: string = DEFAULT_CON_ID) {
    const { directory } = this.getConfig(conId);
    const fileNames = await fs.promises.readdir(directory);

    const files = fileNames?.reduce((files, fileName) => {
      const mtime = moment(fs.statSync(directory + fileName).mtime);

      if (mtime > moment(start) && mtime < moment(end)) {
        files.push(fileName);
      }

      return files;
    }, []);

    const promises = files?.map(file => {
      const path = directory + file;
      return fs.promises.unlink(path);
    });

    return Promise.all(promises);
  }
}
