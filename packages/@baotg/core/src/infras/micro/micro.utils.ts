import { Transport } from '@nestjs/microservices';
import { MicroTransport } from './micro.config';

export const getTransport = (transport: MicroTransport): Transport => {
  return Transport[MicroTransport[transport] as keyof typeof Transport];
};
