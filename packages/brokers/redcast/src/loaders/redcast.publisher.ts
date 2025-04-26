import { BaseMethodDecorator, CallbackMethodOptions, DEFAULT_CON_ID } from '@joktec/core';
import { toArray } from '@joktec/utils';
import { RedcastPublishDecoratorOptions } from '../models';
import { RedcastService } from '../redcast.service';

export function RedcastPublish<T = any>(
  channel: string,
  options: RedcastPublishDecoratorOptions = { useEnv: false },
  conId: string = DEFAULT_CON_ID,
): MethodDecorator {
  const redOptions: RedcastPublishDecoratorOptions = options || {};

  return BaseMethodDecorator(
    async (options: CallbackMethodOptions): Promise<T> => {
      const { method, args, services } = options;
      const redcastService: RedcastService = services.redcastService;

      try {
        const result: T = await method(...args);
        if (!result || (Array.isArray(result) && !result.length)) return result;

        let channelName = channel;
        if (redOptions?.useEnv) {
          channelName = services.configService.resolveConfigValue(channel, false);
          if (!channelName) {
            services.pinoLogger.warn("`%s` Can't resolve channel name from config: %s", conId, channel);
            channelName = channel;
          }
        }

        const messages = toArray(result).map(value => JSON.stringify(value));
        await redcastService.publish(channelName, messages, conId);
        return result;
      } catch (error) {
        services.pinoLogger.error(error, '[RedcastPublish] Failed to publish message:');
        throw error;
      }
    },
    [RedcastService],
  );
}
