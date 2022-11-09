import { Transport } from '@nestjs/microservices';
import { IMicroserviceConfig } from '../../interfaces/base.config.interface';

export class MarketInsightMicroserviceConfig implements IMicroserviceConfig {
  public name = 'Jobhopin.MarketInsightMicroservice';
  public microserviceOptions = {
    options: {
      urls: [process.env.MARKET_INSIGHT_SERVICE_RABITMQ_URL],
      queue: process.env.MARKET_INSIGHT_SERVICE_RABITMQ_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
    transport: Transport.RMQ,
  } as any;
}
