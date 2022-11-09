import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Req,
  Res,
  Inject,
  BadRequestException,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import {
  AuthMessagePattern,
  JwtAuthGuard,
  AuthMicroserviceConfig,

  // * Inputs
  LoginInput,
  RegisterInput,
  RequestResetPasswordInput,
  CreatePasswordInput,
  UpdatePasswordInput,
  UpdateProfileInput,
  VerifyEmailInput,
  ResendVerificationCodeInput,
  LoginOAuthInput,
} from '@jobhopin/core';

import { NAME } from './auth.constants';

const authMicroserviceConfig = new AuthMicroserviceConfig();
@Controller(NAME)
export class AuthController {
  constructor(
    @Inject(authMicroserviceConfig.name) private readonly authMicroservice: ClientProxy,
  ) {}

  @Post('login')
  async login(@Body() payload: LoginInput, @Res() res) {
    try {
      const object = await firstValueFrom(
        this.authMicroservice.send(AuthMessagePattern.LOGIN, {
          ...payload,
        }),
      );

      return res.json(object);
    } catch (err) {
      if (err.status === 'error') {
        throw new BadRequestException(err.message);
      }

      throw new InternalServerErrorException(err.message);
    }
  }

  @Post('login-oauth')
  async loginOAuth(@Body() payload: LoginOAuthInput, @Res() res) {
    try {
      const object = await firstValueFrom(
        this.authMicroservice.send(AuthMessagePattern.LOGIN_OAUTH, {
          ...payload,
        }),
      );

      return res.json(object);
    } catch (err) {
      if (err.status === 'error') {
        throw new BadRequestException(err.message);
      }

      throw new InternalServerErrorException(err.message);
    }
  }

  @Post('register')
  async register(@Body() payload: RegisterInput, @Res() res) {
    try {
      const object = await firstValueFrom(
        this.authMicroservice.send(AuthMessagePattern.SIGN_UP, {
          ...payload,
        }),
      );

      return res.json(object);
    } catch (err) {
      if (err.status === 'error') {
        throw new BadRequestException(err.message);
      }

      throw new InternalServerErrorException(err.message);
    }
  }

  @Post('resend-verification-code')
  async resendVerificationCode(
    @Body() payload: ResendVerificationCodeInput,
    @Res() res,
  ) {
    try {
      const object = await firstValueFrom(
        this.authMicroservice.send(
          AuthMessagePattern.RESEND_VERIFICATION_CODE,
          {
            ...payload,
          },
        ),
      );

      return res.json(object);
    } catch (err) {
      if (err.status === 'error') {
        throw new BadRequestException(err.message);
      }

      throw new InternalServerErrorException(err.message);
    }
  }

  @Post('verify-email')
  async verifyEmail(@Body() payload: VerifyEmailInput, @Res() res) {
    try {
      const object = await firstValueFrom(
        this.authMicroservice.send(AuthMessagePattern.VERIFY_EMAIL, {
          ...payload,
        }),
      );

      return res.json(object);
    } catch (err) {
      if (err.status === 'error') {
        throw new BadRequestException(err.message);
      }

      throw new InternalServerErrorException(err.message);
    }
  }

  @Post('request-reset-password')
  async requestResetPassword(
    @Body() payload: RequestResetPasswordInput,
    @Res() res,
  ) {
    try {
      const object = await firstValueFrom(
        this.authMicroservice.send(
          AuthMessagePattern.REQUEST_RESET_PASSWORD,
          {
            ...payload,
          },
        ),
      );

      return res.json(object);
    } catch (err) {
      if (err.status === 'error') {
        throw new BadRequestException(err.message);
      }

      throw new InternalServerErrorException(err.message);
    }
  }

  @Post('create-password')
  async createPassword(@Body() payload: CreatePasswordInput, @Res() res) {
    try {
      const object = await firstValueFrom(
        this.authMicroservice.send(
          AuthMessagePattern.CREATE_PASSWORD,
          {
            ...payload,
          },
        ),
      );

      return res.json(object);
    } catch (err) {
      if (err.status === 'error') {
        throw new BadRequestException(err.message);
      }

      throw new InternalServerErrorException(err.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-password')
  async updatePassword(
    @Req() req,
    @Res() res,
    @Body() payload: UpdatePasswordInput,
  ) {
    try {
      const object = await firstValueFrom(
        this.authMicroservice.send(
          AuthMessagePattern.UPDATE_PASSWORD,
          {
            id: req.user.id,
            ...payload,
          },
        ),
      );

      return res.json(object);
    } catch (err) {
      if (err.status === 'error') {
        throw new BadRequestException(err.message);
      }

      throw new InternalServerErrorException(err.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req, @Res() res) {
    try {
      const object = await firstValueFrom(
        this.authMicroservice.send(AuthMessagePattern.GET_PROFILE, {
          id: req.user.id,
        }),
      );

      return res.json(object);
    } catch (err) {
      if (err.status === 'error') {
        throw new BadRequestException(err.message);
      }

      throw new InternalServerErrorException(err.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  async updateProfile(
    @Req() req,
    @Res() res,
    @Body() payload: UpdateProfileInput,
  ) {
    try {
      const object = await firstValueFrom(
        this.authMicroservice.send(
          AuthMessagePattern.UPDATE_PROFILE,
          {
            id: req.user.id,
            ...payload,
          },
        ),
      );

      return res.json(object);
    } catch (err) {
      if (err.status === 'error') {
        throw new BadRequestException(err.message);
      }

      throw new InternalServerErrorException(err.message);
    }
  }
}
