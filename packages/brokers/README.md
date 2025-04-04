# Brokers

This directory contains packages that handle message brokering, typically through queue or pub/sub mechanisms. These are used for inter-service communication.

## Packages

- `@joktec/kafka`: Kafka client wrapper for producing and consuming events.
- `@joktec/rabbit`: RabbitMQ client wrapper for managing queues and message consumption.
- `@joktec/redcast`: Redis Pub/Sub client wrapper for lightweight message broadcasting and real-time event handling across distributed services.
