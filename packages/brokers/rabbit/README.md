<div align="center">
  <h1>@joktec/rabbit</h1>
  <p>Lightweight wrapper for RabbitMQ, designed for queueing, event publishing, and message consumption in distributed systems.</p>
</div>

## Installation

```bash
yarn add @joktec/rabbit
```

## Features

- Simple and unified client for RabbitMQ (queueing + pub/sub) operations
- Support sending and consuming messages to/from queues
- Support publishing messages to exchanges with routing keys
- Auto-binding queues to exchanges
- Built-in retry, metrics, logging integration
- Graceful shutdown handling for consumers

## Configuration

You can configure RabbitMQ settings via your application configuration file (`config.yaml` or equivalent):

```yaml
rabbit:
  hostname: localhost
  port: 5672
  username: guest
  password: guest
  vhost: /
  heartbeat: 30
```

If you have multiple instances:

```yaml
rabbit:
  - conId: default
    hostname: localhost
    port: 5672
    username: guest
    password: guest
    vhost: /
    heartbeat: 30
  - conId: other
    hostname: localhost
    port: 5672
    username: guest
    password: guest
    vhost: /
    heartbeat: 30
```

## Module Import

Simple usage:

```typescript
import { RabbitModule } from '@joktec/rabbit';

@Module({
  imports: [RabbitModule],
})
export class AppModule {}
```

Or initialize manually:

```typescript
RabbitModule.forRoot();
```

With auto-binding queues and exchanges:

```typescript
RabbitModule.forRoot({
  autoBinding: [
    { queue: 'order.created', exchangeKey: 'order-exchange', routingKey: 'order.created' },
    { queue: 'payment.completed', exchangeKey: 'payment-exchange', routingKey: 'payment.completed' },
  ],
  conId: 'default',
});
```

## Service Usage

Inject `RabbitService` in your services:

```typescript
constructor(private readonly rabbitService: RabbitService) {}
```

Then use:

```typescript
await this.rabbitService.sendToQueue('my-queue', ['Hello, world!']);
await this.rabbitService.consume('my-queue', async (msg) => {
  console.log('Received message:', msg.content.toString());
});
await this.rabbitService.publish('my-exchange', [{ key: 'my-routing-key', content: 'Broadcast event' }]);
```

## Decorator Usage

**Send message with Decorator:**

```typescript
@RabbitQueue('rabbit.queues.testQueue', { useEnv: true }, DEFAULT_CON_ID)
async sendToRabbit() {
  const randNumber = rand(1000, 9999);
  return { success: true, action: 'sendToRabbit', randNumber };
}
```

**Consume messages with Decorator:**

```typescript
@RabbitConsume('rabbit.queues.testQueue', { useEnv: true }, DEFAULT_CON_ID)
async handleRabbitMsg(msg: RabbitConsumeMessage) {
  console.log('Received RabbitMQ message:', msg.content.toString());
}
```

**Publish to exchange with Decorator:**

```typescript
@RabbitExchange('rabbit.exchanges.testExchange', 'test.routing.key', { useEnv: true }, DEFAULT_CON_ID)
async publishToExchange() {
  return { event: 'test.event' };
}
```

## About `useEnv`

If `useEnv` is set to true, the queue or exchange name will be resolved automatically from your environment or config file.

Example config:

```yaml
rabbit:
  queues:
    testQueue: test-queue
  exchanges:
    testExchange: test-exchange
```

There is no strict naming convention for queue keys. Just ensure you define them properly and refer to them consistently.

## Development

For local development:

```bash
# Link this package
cd packages/brokers/rabbit
yarn link

# In your test project
yarn link @joktec/rabbit
```

Use `yarn link @joktec/rabbit` to integrate and test changes before publishing.

## Contributing

Pull requests are welcome!  
For major changes, please open an issue first to discuss the proposal.

Make sure to update any relevant tests when contributing.

---
© JokTec Team
