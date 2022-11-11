import { Injectable, LogService, OnModuleInit } from '@jobhopin/core';
import { EsService } from '@jobhopin/elastic';

@Injectable()
export class ElasticExampleService implements OnModuleInit {
  constructor(private esService: EsService, private logService: LogService) {}

  onModuleInit() {
    (async () => {
      await this.init();
    })();
  }

  async init() {
    const searchRes = await this.esService.search({
      index: 'job-index',
      query: {
        match: {
          title: 'Smith',
        },
      },
    });
    this.logService.info('Search Res: %j', searchRes);
  }
}
