<div align="center">
  <h1>@joktec/redcast</h1>
  <p>Lightweight wrapper for Redis Pub/Sub, List Queue, and Stream, designed for real-time messaging and distributed queue processing.</p>
</div>

## Installation

```bash
yarn add @joktec/redcast
```

## Features

- Simple client for Redis Pub/Sub, List-based Queues, and Streams
- Support publish/subscribe messaging model
- Support reliable queue processing using Redis lists
- Support event sourcing with Redis Streams (requires Redis >= 5.0)
- Built-in retry, metrics, logging integration
- Graceful shutdown handling for consumers

## Redis Version Requirement

- **Pub/Sub and List Queue:** Supported on all Redis versions.
- **Stream Queue:** Requires **Redis 5.0** or higher.

## Configuration

Configure Redis settings via your application configuration file (`config.yaml` or equivalent):

```yaml
redcast:
  host: localhost
  port: 6379
  password: ''
  database: 0
```

For multiple instances:

```yaml
redcast:
  - conId: default
    host: localhost
    port: 6379
    database: 0
  - conId: other
    host: localhost
    port: 6379
    database: 1
```

## Module Import

Simple usage:

```typescript
import { RedcastModule } from '@joktec/redcast';

@Module({
  imports: [RedcastModule],
})
export class AppModule {}
```

Or initialize manually:

```typescript
RedcastModule.forRoot();
```

## Service Usage

Inject `RedcastService` in your services:

```typescript
constructor(private readonly redcastService: RedcastService) {}
```

### Pub/Sub Example

```typescript
// Publish message to a channel
await this.redcastService.publish('my-channel', ['Hello, Pub/Sub!']);

// Subscribe to a channel
await this.redcastService.subscribe('my-channel', async (channel, message) => {
  console.log(`Received from ${channel}: ${message}`);
});
```

### List Queue Example

```typescript
// Send messages to a queue (Redis List)
await this.redcastService.sendToQueue('my-queue', ['Task 1', 'Task 2']);

// Consume messages from a queue
await this.redcastService.consume('my-queue', async (message) => {
  console.log('Processing message:', message);
});
```

### Stream Queue Example (Requires Redis 5.0+)

```typescript
// Send messages to a stream
await this.redcastService.sendToStream('my-stream', ['Event 1', 'Event 2']);

// Consume messages from a stream
await this.redcastService.consumeStream('my-stream', async (message) => {
  console.log('Stream event:', message);
});
```

## Decorator Usage

**Send message with Decorator:**

```typescript
@RedcastSend('redcast.queues.testQueue', { UseEnv: true }, DEFAULT_CON_ID)
async sendMessage() {
  return { data: 'Sample Task' };
}
```

**Consume messages with Decorator:**

```typescript
@RedcastConsume('redcast.queues.testQueue', { UseEnv: true }, DEFAULT_CON_ID)
async processMessage(msg: string) {
  console.log('Consumed message:', msg);
}
```

**Publish to Pub/Sub Channel with Decorator:**

```typescript
@RedcastPublish('redcast.channels.testChannel', { UseEnv: true }, DEFAULT_CON_ID)
async publishMessage() {
  return { event: 'UserRegistered' };
}
```

## About `UseEnv`

If `UseEnv` is set to true, the channel, queue, or stream name will be resolved from your environment variables or config file.

Example config:

```yaml
redcast:
  host: localhost
  port: 6379
  queues:
    testQueue: redcast-test-queue
    testStream: redcast-test-stream
```

There is no strict naming convention for keys. Just ensure they are properly mapped.

## Development

For local development:

```bash
# Link this package
cd packages/brokers/redcast
yarn link

# In your test project
yarn link @joktec/redcast
```

Use `yarn link @joktec/redcast` to integrate and test changes before publishing.

## Contributing

Pull requests are welcome!  
For major changes, please open an issue first to discuss your proposal.

Make sure to update relevant tests when contributing.

---
© JokTec Team
