import { BaseMethodDecorator, CallbackMethodOptions, DEFAULT_CON_ID } from '@joktec/core';
import { toArray } from '@joktec/utils';
import { RedcastService } from '../redcast.service';

export function RedcastPublish<T = any>(channel: string, conId?: string): MethodDecorator {
  return BaseMethodDecorator(
    async (options: CallbackMethodOptions): Promise<T> => {
      const { method, args, services } = options;
      const redcastService: RedcastService = services.redcastService;
      const connectionId = conId || DEFAULT_CON_ID;

      try {
        const result: T = await method(...args);
        if (!result || (Array.isArray(result) && !result.length)) return result;

        const messages = toArray(result).map(value => JSON.stringify(value));
        await redcastService.publish(channel, messages, connectionId);

        return result;
      } catch (error) {
        services.pinoLogger.error(error, '[RedcastPublish] Failed to publish message:');
        throw error;
      }
    },
    [RedcastService],
  );
}
