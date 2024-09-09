import { ClientController, Controller, EventPattern, IMicroControllerProps, Payload, Transport } from '@joktec/core';
import { SuccessResponse } from '../../common';
import { Otp } from '../../models/schemas';
import { OtpService } from './otp.service';

const props: IMicroControllerProps<Otp> = {
  dto: Otp,
  transport: Transport.REDIS,
};

@Controller('otps')
export class OtpController extends ClientController<Otp, string>(props) {
  constructor(protected otpService: OtpService) {
    super(otpService);
  }

  @EventPattern({ cmd: `Otp.sendVerify` }, Transport.REDIS)
  async summary(@Payload('otp') otp: Otp): Promise<SuccessResponse> {
    return this.otpService.sendEmail(otp);
  }
}
