import { Injectable, LogService, OnModuleInit } from '@jobhopin/core';
import { EsService } from '@jobhopin/elastic';

@Injectable()
export class ElasticExampleService implements OnModuleInit {
  constructor(private esService: EsService, private logService: LogService) {}

  async onModuleInit(): Promise<void> {
    const documents = [
      {
        _id: '1',
        first_name: 'John',
        last_name: 'Smith',
        age: 25,
        about: 'I love to go rock climbing',
        interests: ['sports', 'music'],
      },
      {
        _id: '2',
        first_name: 'Jane',
        last_name: 'Laura',
        age: 30,
        about: 'I love to go swimming',
        interests: ['music'],
      },
      {
        _id: '3',
        first_name: 'Messi',
        last_name: 'Leonel',
        age: 40,
        about: 'I love to go playing soccer',
        interests: ['forestry'],
      },
    ];

    const bulkDocs = documents.map(doc => ({ _id: doc._id, doc }));
    const bulkRes = await this.esService.bulk('job-index', bulkDocs, { refresh: true });
    this.logService.info('Bulk Res: %j', bulkRes);

    const searchRes = await this.esService.search('job-index', {
      query: {
        match: {
          title: 'Smith',
        },
      },
    });
    this.logService.info('Search Res: %j', searchRes);
  }
}
