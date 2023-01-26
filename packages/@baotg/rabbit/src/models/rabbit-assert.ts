import amqp from 'amqplib';

export type RabbitAssertQueue = amqp.Replies.AssertQueue;

export type RabbitAssertExchange = amqp.Replies.AssertExchange;

export type RabbitPurgeQueue = amqp.Replies.PurgeQueue;

export type RabbitEmpty = amqp.Replies.Empty;
