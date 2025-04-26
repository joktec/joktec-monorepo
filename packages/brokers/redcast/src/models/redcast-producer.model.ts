export class RedcastProduceOptions {}

export class RedcastProduceDecoratorOptions extends RedcastProduceOptions {
  useEnv?: boolean;
  mode?: 'list' | 'stream';
}
