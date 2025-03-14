import { EachBatchPayload, EachMessagePayload } from 'kafkajs';

export interface KafkaEachMessage extends EachMessagePayload {}

export interface KafkaBatchMessage extends EachBatchPayload {}
