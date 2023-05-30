import { SetMetadata } from '@nestjs/common';

export const RESPONSE_MESSAGE_KEY = 'response_message';

export const ResponseMessage = (message: string) => SetMetadata<string, string>(RESPONSE_MESSAGE_KEY, message);
