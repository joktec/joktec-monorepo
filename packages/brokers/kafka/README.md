
<div align="center">
  <h1>@joktec/kafka</h1>
  <p>Lightweight wrapper for Kafka, designed for message production, batch sending, and topic consumption in distributed systems.</p>
</div>

## Installation

```bash
yarn add @joktec/kafka
```

## Features

- Simple and unified Kafka producer/consumer client
- Support sending single and batch messages to Kafka topics
- Support consuming messages individually or in batch mode
- Built-in retry, metrics, logging integration
- Graceful shutdown handling for consumers

## Configuration

You can configure Kafka settings via your application configuration file (`config.yaml` or equivalent):

```yaml
kafka:
  brokers:
    - localhost:9092
  clientId: my-app
```

If you have multiple instances:

```yaml
kafka:
  - conId: default
    brokers:
      - localhost:9092
    clientId: my-app
  - conId: other
    brokers:
      - localhost:9093
    clientId: my-other-app
```

## Module Import

Simple usage:

```typescript
import { KafkaModule } from '@joktec/kafka';

@Module({
  imports: [KafkaModule],
})
export class AppModule {}
```

Or initialize manually:

```typescript
KafkaModule.forRoot();
```

## Service Usage

Inject `KafkaService` in your services:

```typescript
constructor(private readonly kafkaService: KafkaService) {}
```

Then use:

```typescript
await this.kafkaService.send('my-topic', [{ value: 'Message 1' }]);
await this.kafkaService.sendBatch({
  topicMessages: [
    { topic: 'topicA', messages: [{ value: 'Hello' }] },
    { topic: 'topicB', messages: [{ value: 'World' }] },
  ],
});
await this.kafkaService.consume(['topicA'], 'groupA', async (payload) => {
  console.log('Received message:', payload.message.value?.toString());
});
await this.kafkaService.consumeBatch(['topicA'], 'groupA', async (payload) => {
  for (const message of payload.batch.messages) {
    console.log('Batch received:', message.value?.toString());
  }
});
```

## Decorator Usage

**Send message with Decorator:**

```typescript
@KafkaSend('my-topic')
async sendKafkaMessage() {
  return { hello: 'world' };
}
```

**Consume single messages with Decorator:**

```typescript
@KafkaConsume('my-topic', 'groupA')
async handleKafkaMessage(payload: KafkaConsumeEachMessage) {
  console.log('Received from Kafka:', payload.message.value?.toString());
}
```

**Consume batch messages with Decorator:**

```typescript
@KafkaConsumeBatch('my-topic', 'groupA')
async handleKafkaBatch(payload: KafkaConsumeBatchMessage) {
  for (const message of payload.batch.messages) {
    console.log('Batch received:', message.value?.toString());
  }
}
```

## About `UseEnv`

If `UseEnv` is set to true, the topic name will be resolved automatically from your environment or config file.  
Example config:

```yaml
kafka:
  brokers:
    - localhost:9092
  clientId: my-app
  topics:
    testTopic: my-topic
```

There is no strict naming convention for topic keys. Just ensure you define them properly and refer to them consistently.

## Development

For local development:

```bash
# Link this package
cd packages/brokers/kafka
yarn link

# In your test project
yarn link @joktec/kafka
```

Use `yarn link @joktec/kafka` to integrate and test changes before publishing.

## Contributing

Pull requests are welcome!  
For major changes, please open an issue first to discuss the proposal.

Make sure to update any relevant tests when contributing.

---
© JokTec Team
