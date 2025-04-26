<div align="center">
  <h1>@joktec/sqs</h1>
  <p>Lightweight wrapper for AWS SQS and SNS, designed for message queuing, event broadcasting, and queue consumption in distributed systems.</p>
</div>

## Installation

```bash
yarn add @joktec/sqs
```

## Features

- Simple and unified client for AWS SQS (queueing) and SNS (pub/sub) operations
- Support sending and consuming messages from SQS queues
- Support publishing messages to SNS topics
- Automatically binds SNS topics to SQS queues
- Built-in retry, metrics, logging integration
- Graceful shutdown handling for consumers


## Usage Example

```typescript
import { SqsService } from '@joktec/sqs';

// Initialize and send a message
const sqsService = new SqsService();
await sqsService.sendToQueue('my-queue', ['Hello, world!']);

// Consume messages
await sqsService.consume('my-queue', async (msg) => {
  console.log('Received message:', msg.Body);
});

// Publish to SNS topic
await sqsService.publish('my-topic', ['Broadcast event']);
await sqsService.bindQueueToTopic('my-topic', 'my-queue');
```

## Configuration

You can configure SQS/SNS settings via your application configuration file (`config.yaml` or equivalent):

```yaml
sqs:
  region: us-east-1
  accessKey: dummy
  secretKey: dummy
  endpoint: http://localhost:9324
```

If you have multiple instances:

```yaml
sqs:
  - conId: default
    region: us-east-1
    accessKey: dummy
    secretKey: dummy
    endpoint: http://localhost:9324
  - conId: other
    region: us-east-1
    accessKey: dummy
    secretKey: dummy
    endpoint: http://localhost:9324
```

## Module Import

Simple usage:

```typescript
import { SqsModule } from '@joktec/sqs';

@Module({
  imports: [SqsModule],
})
export class AppModule {}
```

Or initialize manually:

```typescript
SqsModule.forRoot();
```

With auto-binding SNS topics to SQS queues:

```typescript
SqsModule.forRoot({
  autoBinding: [
    { queue: 'order.stock.verify', topic: 'order.event.checkout' },
    { queue: 'order.price.verify', topic: 'order.event.checkout' },
    { queue: 'order.promotion.verify', topic: 'order.event.checkout' },
  ],
  conId: 'default',
});
```

## Service Usage

Inject `SqsService` in your services:

```typescript
constructor(private readonly sqsService: SqsService) {}
```

Then use:

```typescript
await this.sqsService.sendToQueue('my-queue', ['Hello, world!']);
await this.sqsService.consume('my-queue', async (msg) => {
  console.log('Received message:', msg.Body);
});
await this.sqsService.publish('my-topic', ['Broadcast event']);
await this.sqsService.bindQueueToTopic('my-topic', 'my-queue');
```

## Decorator Usage

**Send message with Decorator:**

```typescript
@SqsSend('sqs.queues.testQueue', { UseEnv: true }, DEFAULT_CON_ID)
async sendToSqs() {
  const randNumber = rand(1000, 9999);
  return { success: true, action: 'sendToSqs', randNumber };
}
```

**Consume messages with Decorator:**

```typescript
@SqsConsume('sqs.queues.testQueue', { UseEnv: true }, DEFAULT_CON_ID)
async testSqs(msg: SqsMessage) {
  this.logService.info('testSqs data: %j', { ...msg });
  await this.userRepo.find({});
  await sleep(1000);
}
```

**Publish to SNS topic with Decorator:**

```typescript
@SqsPublish('sqs.queues.testQueue', { UseEnv: true }, DEFAULT_CON_ID)
async sendToSqs() {
  const randNumber = rand(1000, 9999);
  return { success: true, action: 'sendToSqs', randNumber };
}
```

## About `UseEnv`

If `UseEnv` is set to true, the queue or topic name will be resolved automatically from your environment or config file.  
Example config:

```yaml
sqs:
  region: us-east-1
  accessKey: dummy
  secretKey: dummy
  endpoint: http://localhost:9324
  queues:
    testQueue: TestQueue
```

There is no strict naming convention for queue keys. Just ensure you define them properly and refer to them consistently.

## Development

For local development:

```bash
# Link this package
cd packages/brokers/sqs
yarn link

# In your test project
yarn link @joktec/sqs
```

Use `yarn link @joktec/sqs` to integrate and test changes before publishing.

## Contributing

Pull requests are welcome!  
For major changes, please open an issue first to discuss the proposal.

Make sure to update any relevant tests when contributing.

---
© JokTec Team
