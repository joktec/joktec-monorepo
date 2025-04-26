import { ProducerBatch, ProducerConfig, ProducerRecord } from 'kafkajs';

export interface KafkaProduceRecord extends Omit<ProducerRecord, 'topic' | 'messages'> {
  producerKey?: string;
}

export interface KafkaProduceConfig extends ProducerConfig {}

// ========= Producer One =========
export interface KafkaProducerOptions {
  record?: KafkaProduceRecord;
  config?: KafkaProduceConfig;
}

export interface KafkaProduceDecoratorOptions extends KafkaProducerOptions {
  useEnv?: boolean;
}

// ========= Producer Batch =========
export interface KafkaProduceBatch extends ProducerBatch {
  producerKey: string;
}

export interface KafkaProduceBatchOptions {
  config?: KafkaProduceConfig;
}
