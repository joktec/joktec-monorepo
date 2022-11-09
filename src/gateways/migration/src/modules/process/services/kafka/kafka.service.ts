import { Injectable, Logger } from '@nestjs/common';
import { Consumer, Kafka } from 'kafkajs';
import { Topic } from '../../schemas/topic.chema';

@Injectable()
export class KafkaService {
  private logger = new Logger(KafkaService.name);

  private KAFKA_GROUP_ID = 'migration-group';
  private KAFKA_PARTITION = 0;

  private kafka: Kafka;
  private consumerMap = new Map<number, Consumer>();

  constructor() {
    this.kafka = new Kafka({
      clientId: 'my-kafka',
      brokers: [process.env.KAFKA_BROKER],
    });
  }

  async comsume(processId: number, topics: Array<Topic>, callback) {
    let consumer = this.consumerMap.get(processId);

    if (!consumer) {
      consumer = this.kafka.consumer({
        groupId: `${this.KAFKA_GROUP_ID}_${processId}`,
      });
    }

    const topicNames = topics.map((topic) => {
      return topic.name;
    });
    this.logger.log(`start consumer with topics ${topicNames}`);

    await consumer.subscribe({
      topics: topicNames,
      fromBeginning: true,
    });

    consumer.run({
      eachMessage: callback,
    });

    for (const topic of topics) {
      consumer.seek({
        topic: topic.name,
        partition: topic.partition ? topic.partition : this.KAFKA_PARTITION,
        offset: topic.offset,
      });
    }
  }

  async stopConsume(processId: number) {
    const consumer = this.consumerMap.get(processId);
    if (consumer) {
      consumer.stop();
    }
  }
}
