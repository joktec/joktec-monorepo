import { firstValueFrom } from 'rxjs';
import {
  AuthMicroserviceConfig,
  AuthMessagePattern,
  GraphqlJwtAuthGuard,
  CurrentUser,
} from '@jobhopin/core';
import {
  Inject,
  UseGuards,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  Resolver,
  Query,
  Mutation,
  Args,
} from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

import {
  CreatePasswordInput,
  LoginOAuthInput,
  LoginInput,
  RegisterInput,
  RequestResetPasswordInput,
  ResendVerificationCodeInput,
  UpdatePasswordInput,
  UpdateProfileInput,
  VerifyEmailInput,
} from './inputs';

import {
  LoginResponse,
  RegisterResponse,
  UserResponse,
  MessageResponse,
} from './typedefs';

@Resolver()
export class AuthResolver {
  constructor(
    @Inject((new AuthMicroserviceConfig()).name)
    private readonly authMicroservice: ClientProxy,
  ) {}

  // * Queries
  @UseGuards(GraphqlJwtAuthGuard)
  @Query(() => UserResponse)
  async getProfile(
    @CurrentUser() user,
  ) {
    try {
      return await firstValueFrom(
        this.authMicroservice.send(AuthMessagePattern.GET_PROFILE, {
          id: user.id,
        }),
      );
    } catch (err) {
      if (err.status === 'error') {
        throw new BadRequestException(err.message);
      }

      throw new InternalServerErrorException(err.message);
    }
  }

  // * Mutations
  @Mutation(() => LoginResponse)
  async login(
    @Args('input')
    input: LoginInput,
  ) {
    try {
      return await firstValueFrom(
        this.authMicroservice.send(AuthMessagePattern.LOGIN, {
          ...input,
        }),
      );
    } catch (err) {
      if (err.status === 'error') {
        throw new BadRequestException(err.message);
      }

      throw new InternalServerErrorException(err.message);
    }
  }

  @Mutation(() => LoginResponse)
  async loginOAuth(
    @Args('input')
    input: LoginOAuthInput,
  ) {
    try {
      return await firstValueFrom(
        this.authMicroservice.send(AuthMessagePattern.LOGIN_OAUTH, {
          ...input,
        }),
      );
    } catch (err) {
      if (err.status === 'error') {
        throw new BadRequestException(err.message);
      }

      throw new InternalServerErrorException(err.message);
    }
  }
  
  @Mutation(() => RegisterResponse)
  async register(
    @Args('input')
    input: RegisterInput,
  ) {
    try {
      return await firstValueFrom(
        this.authMicroservice.send(AuthMessagePattern.SIGN_UP, {
          ...input,
        }),
      );
    } catch (err) {
      if (err.status === 'error') {
        throw new BadRequestException(err.message);
      }

      throw new InternalServerErrorException(err.message);
    }
  }

  @Mutation(() => MessageResponse)
  async resendVerificationCode(
    @Args('input')
    input: ResendVerificationCodeInput,
  ) {
    try {
      await firstValueFrom(
        this.authMicroservice.send(AuthMessagePattern.RESEND_VERIFICATION_CODE, {
          ...input,
        }),
      );

      return {
        success: true,
        message: 'Resent verification code successfully',
      };
    } catch (err) {
      if (err.status === 'error') {
        throw new BadRequestException(err.message);
      }

      throw new InternalServerErrorException(err.message);
    }
  }

  @Mutation(() => MessageResponse)
  async verifyEmail(
    @Args('input')
    input: VerifyEmailInput,
  ) {
    try {
      await firstValueFrom(
        this.authMicroservice.send(AuthMessagePattern.VERIFY_EMAIL, {
          ...input,
        }),
      );

      return {
        success: true,
        message: 'Verified email successfully',
      };
    } catch (err) {
      if (err.status === 'error') {
        throw new BadRequestException(err.message);
      }

      throw new InternalServerErrorException(err.message);
    }
  }

  @Mutation(() => MessageResponse)
  async requestResetPassword(
    @Args('input')
    input: RequestResetPasswordInput,
  ) {
    try {
      await firstValueFrom(
        this.authMicroservice.send(AuthMessagePattern.REQUEST_RESET_PASSWORD, {
          ...input,
        }),
      );

      return {
        success: true,
        message: 'Sent a request reset password successfully',
      };
    } catch (err) {
      if (err.status === 'error') {
        throw new BadRequestException(err.message);
      }

      throw new InternalServerErrorException(err.message);
    }
  }

  @Mutation(() => MessageResponse)
  async createPassword(
    @Args('input')
    input: CreatePasswordInput,
  ) {
    try {
      await firstValueFrom(
        this.authMicroservice.send(AuthMessagePattern.CREATE_PASSWORD, {
          ...input,
        }),
      );

      return {
        success: true,
        message: 'Reset password successfully',
      };
    } catch (err) {
      if (err.status === 'error') {
        throw new BadRequestException(err.message);
      }

      throw new InternalServerErrorException(err.message);
    }
  }

  @Mutation(() => MessageResponse)
  async updatePassword(
    @Args('input')
    input: UpdatePasswordInput,
  ) {
    try {
      await firstValueFrom(
        this.authMicroservice.send(AuthMessagePattern.UPDATE_PASSWORD, {
          ...input,
        }),
      );

      return {
        success: true,
        message: 'Updated password successfully',
      };
    } catch (err) {
      if (err.status === 'error') {
        throw new BadRequestException(err.message);
      }

      throw new InternalServerErrorException(err.message);
    }
  }

  @UseGuards(GraphqlJwtAuthGuard)
  @Mutation(() => UserResponse)
  async updateProfile(
    @Args('input')
    input: UpdateProfileInput,

    @CurrentUser() user,
  ) {
    try {
      return await firstValueFrom(
        this.authMicroservice.send(AuthMessagePattern.UPDATE_PROFILE, {
          id: user.id,
          ...input,
        }),
      );
    } catch (err) {
      if (err.status === 'error') {
        throw new BadRequestException(err.message);
      }

      throw new InternalServerErrorException(err.message);
    }
  }
}
