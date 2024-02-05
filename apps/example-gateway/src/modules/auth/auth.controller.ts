import {
  ApiBody,
  ApiOkResponse,
  ApiTags,
  BaseValidationPipe,
  Body,
  Controller,
  GatewayMetric,
  LogService,
  Post,
  UseInterceptors,
  UsePipes,
} from '@joktec/core';
import { OTPStatus } from '../../models/constants';
import { Otp } from '../../models/entities';
import { AuthService } from './auth.service';
import {
  LoginDto,
  LoginSsoDto,
  RefreshTokenDto,
  RegisterDto,
  ResetDto,
  SendOtpDto,
  SendOtpResponse,
  TokeResponseDto,
  VerifyOtpDto,
  VerifyOtpResponse,
} from './models';

@Controller('auth')
@ApiTags('auth')
@UsePipes(new BaseValidationPipe())
@UseInterceptors(GatewayMetric)
export class AuthController {
  constructor(
    private logger: LogService,
    private authService: AuthService,
  ) {
    this.logger.setContext(AuthController.name);
  }

  @Post('/send')
  @ApiBody({ type: SendOtpDto })
  @ApiOkResponse({ type: SendOtpResponse })
  async sendOTP(@Body() input: SendOtpDto): Promise<SendOtpResponse> {
    const otp: Otp = await this.authService.send(input);
    if (otp.status === OTPStatus.ACTIVATED) {
      // TODO: Implement send OTP in here
      this.logger.info('Ma xac thuc cua ban la: %s', otp.publicCode);
    }

    return {
      privateCode: otp.privateCode,
      retry: otp.retry,
      expiredInSeconds: otp.expiredInSeconds,
    };
  }

  @Post('/verify')
  @ApiBody({ type: VerifyOtpDto })
  @ApiOkResponse({ type: VerifyOtpResponse })
  async verifyOTP(@Body() input: VerifyOtpDto): Promise<VerifyOtpResponse> {
    const otp: Otp = await this.authService.verifyOtp(input);
    return { activeCode: otp.activeCode };
  }

  @Post('/register')
  @ApiBody({ type: RegisterDto })
  @ApiOkResponse({ type: TokeResponseDto })
  async register(@Body() input: RegisterDto): Promise<TokeResponseDto> {
    return this.authService.register(input);
  }

  @Post('/login')
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ type: TokeResponseDto })
  async login(@Body() input: LoginDto): Promise<TokeResponseDto> {
    this.logger.info('XXXXXX: %j', input);
    return this.authService.login(input);
  }

  @Post('/login-sso')
  @ApiBody({ type: LoginSsoDto })
  @ApiOkResponse({ type: TokeResponseDto })
  async loginSSO(@Body() input: LoginSsoDto): Promise<TokeResponseDto> {
    return this.authService.loginSSO(input);
  }

  @Post('/reset')
  @ApiBody({ type: ResetDto })
  @ApiOkResponse({ type: TokeResponseDto })
  async reset(@Body() input: ResetDto): Promise<TokeResponseDto> {
    return this.authService.reset(input);
  }

  @Post('/refresh')
  @ApiBody({ type: RefreshTokenDto })
  @ApiOkResponse({ type: TokeResponseDto })
  async refresh(@Body() input: RefreshTokenDto): Promise<TokeResponseDto> {
    return this.authService.refresh(input);
  }
}
