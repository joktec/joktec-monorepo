import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  BaseValidationPipe,
  Body,
  ClientProxy,
  Controller,
  Inject,
  LogService,
  Post,
  UsePipes,
} from '@joktec/core';
import { appConfig } from '../../app.config';
import { TRANSPORT } from '../../app.constant';
import { ApiDeviceHeaders } from '../../common';
import { OTPStatus } from '../../models/constants';
import { Otp } from '../../models/schemas';
import { AuthService } from './auth.service';
import {
  LoginDto,
  LoginSsoDto,
  RefreshTokenDto,
  RegisterDto,
  RequestCodeDto,
  ResetDto,
  SendCodeResponse,
  TokeResponseDto,
  VerifyCodeDto,
  VerifyCodeResponse,
} from './models';

@Controller('auth')
@ApiTags('Authentication')
@ApiDeviceHeaders()
@UsePipes(new BaseValidationPipe())
export class AuthController {
  constructor(
    @Inject(TRANSPORT.PROXY.OTP) private otpClient: ClientProxy,
    private logger: LogService,
    private authService: AuthService,
  ) {
    this.logger.setContext(AuthController.name);
  }

  @Post('/send-otp')
  @ApiOperation({ summary: `Send OTP` })
  @ApiBody({ type: RequestCodeDto })
  @ApiOkResponse({ type: SendCodeResponse })
  async sendOtp(@Body() input: RequestCodeDto): Promise<SendCodeResponse> {
    const otp: Otp = await this.authService.send(input);
    if (otp.status === OTPStatus.ACTIVATED) {
      this.logger.info('Ma xac thuc cua ban la: %s', otp.publicCode);
      appConfig?.isProd && this.otpClient.emit({ cmd: 'Otp.sendVerify' }, { otp });
    }
    return { privateCode: otp.privateCode, retry: otp.retry, expiredInSeconds: otp.expiredInSeconds };
  }

  @Post('/verify')
  @ApiOperation({ summary: `Verify OTP` })
  @ApiBody({ type: VerifyCodeDto })
  @ApiOkResponse({ type: VerifyCodeResponse })
  async verifyOTP(@Body() input: VerifyCodeDto): Promise<VerifyCodeResponse> {
    const otp: Otp = await this.authService.verifyOtp(input);
    return { activeCode: otp.activeCode };
  }

  @Post('/register')
  @ApiOperation({ summary: `Register` })
  @ApiBody({ type: RegisterDto })
  @ApiOkResponse({ type: TokeResponseDto })
  async register(@Body() input: RegisterDto): Promise<TokeResponseDto> {
    return this.authService.register(input);
  }

  @Post('/login')
  @ApiOperation({ summary: `Login (default)` })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ type: TokeResponseDto })
  async login(@Body() input: LoginDto): Promise<TokeResponseDto> {
    return this.authService.login(input);
  }

  @Post('/login/sso')
  @ApiOperation({ summary: `Login (SSO)` })
  @ApiBody({ type: LoginSsoDto })
  @ApiOkResponse({ type: TokeResponseDto })
  async loginSso(@Body() input: LoginSsoDto): Promise<TokeResponseDto> {
    return this.authService.loginSso(input);
  }

  @Post('/reset')
  @ApiOperation({ summary: `Reset Password` })
  @ApiBody({ type: ResetDto })
  @ApiOkResponse({ type: TokeResponseDto })
  async reset(@Body() input: ResetDto): Promise<TokeResponseDto> {
    return this.authService.reset(input);
  }

  @Post('/refresh')
  @ApiOperation({ summary: `Refresh Token` })
  @ApiBody({ type: RefreshTokenDto })
  @ApiOkResponse({ type: TokeResponseDto })
  async refresh(@Body() input: RefreshTokenDto): Promise<TokeResponseDto> {
    return this.authService.refresh(input);
  }
}
