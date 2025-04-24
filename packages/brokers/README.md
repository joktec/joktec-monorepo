# Brokers

This directory contains packages that handle message brokering, typically through queue or pub/sub mechanisms. These are used for inter-service communication.

## Packages

- `@joktec/kafka`: Kafka client wrapper for producing and consuming events.
- `@joktec/rabbit`: RabbitMQ client wrapper for managing queues and message consumption.
- `@joktec/redcast`: Redis Pub/Sub client wrapper for lightweight message broadcasting and real-time event handling across distributed services.
- `@joktec/sqs`: AWS SQS client wrapper for sending and receiving messages in a scalable and reliable FIFO or standard queue system. Designed for seamless integration with AWS infrastructure and supports auto-deletion, long polling, and custom message handling options.

## Future Roadmap

This `brokers` package group is designed to be extensible and protocol-driven. In the future, we plan to support additional high-level messaging protocols to increase compatibility and flexibility across different infrastructure stacks and cloud platforms.

### Planned Protocol Support

- **AMQP**: Advanced Message Queuing Protocol used in RabbitMQ, Apache Qpid, and Azure Service Bus. Future versions may abstract RabbitMQ under `@joktec/amqp` to support interchangeable adapters.
- **MQTT**: Lightweight publish-subscribe protocol optimized for IoT and unreliable networks. Targeting integration via `@joktec/mqtt` with support for brokers like Mosquitto, EMQX, etc.
- **STOMP**: Text-based protocol for WebSocket or TCP-based messaging (e.g., ActiveMQ, RabbitMQ).
- **NATS**: High-performance messaging system supporting pub/sub and JetStream (durable streaming). Expected under `@joktec/nats`.
- **Redis Streams**: Advanced streaming capabilities over Redis for reliable messaging with consumer groups.
- **Apache Pulsar**: Cloud-native distributed pub/sub system with segment-based architecture and multi-tenancy.
- **ZeroMQ**: High-performance messaging patterns with no central broker, for local or embedded communication.
- **Cloud-native services** (optional):
  - Google Pub/Sub
  - Azure Service Bus

### Design Philosophy

- Modular design with **protocol-driven abstraction** (`amqp`, `mqtt`, etc.) and optional **adapter-based extensions** (`rabbit`, `qpid`, etc.).
- Unified interfaces across all protocols to support plug-and-play broker switching with minimal refactoring.
- Focus on **developer ergonomics**, robust logging, metric instrumentation, and fail-safe message handling patterns.

This roadmap will evolve to meet modern messaging needs across microservices, IoT, and event-driven architectures.
