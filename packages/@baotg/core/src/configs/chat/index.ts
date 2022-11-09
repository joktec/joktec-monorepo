import { Transport } from '@nestjs/microservices';
import { IMicroserviceConfig } from '../../interfaces/base.config.interface';

export class ChatMicroserviceConfig implements IMicroserviceConfig {
  public name = 'Jobhopin.ChatMicroservice';
  public microserviceOptions = {
    options: {
      urls: [process.env.CHAT_SERVICE_RABITMQ_URL],
      queue: process.env.CHAT_SERVICE_RABITMQ_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
    transport: Transport.RMQ,
  } as any;
}
