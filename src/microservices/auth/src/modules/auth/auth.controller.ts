import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { UserService } from '@app/modules/users/users.service';
import { UserEmailVerificationService } from '@app/modules/user-email-verifications/user-email-verifications.service';
import {
  AuthMessagePattern,
  generateOTP,
  UserEmailVerificationStatus,
  EmailService,
  UserEmailVerificationStatusType,
  AuthOAuthTypeEnum,

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
import { loadResetPasswordTemplate, loadVerifyEmailTemplate } from './templates';
import { getUserProfile as getUserProfileFacebook } from '@app/utils/facebook';
import { getUserProfile as getUserProfileGoogle } from '@app/utils/google';
import { getValidatedWithLinkedinCode } from '@app/utils/linkedin';


@Controller(NAME)
export class AuthController {
  constructor(
    private readonly emailService: EmailService,
    private readonly userService: UserService,
    private readonly userEmailVerificationService: UserEmailVerificationService,
  ) {}

  @MessagePattern(AuthMessagePattern.LOGIN)
  async login(params: LoginInput) {
    try {
      const { username, password } = params;
      if (!username || !password) {
        throw new RpcException('username or password invalid');
      }

      return await this.userService.authenticateLocal(username, password);
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  @MessagePattern(AuthMessagePattern.LOGIN_OAUTH)
  async loginFacebook(params: LoginOAuthInput) {
    try {
      const { type, token } = params;

      if (!token) {
        throw new RpcException('Token invalid');
      }

      let userProfile;

      switch (type) {
        case AuthOAuthTypeEnum.FACEBOOK:
          userProfile = await getUserProfileFacebook(token); 
          break;

        case AuthOAuthTypeEnum.GOOGLE:
          userProfile = await getUserProfileGoogle(token); 
          break;

        case AuthOAuthTypeEnum.LINKEDIN:
          userProfile = await getValidatedWithLinkedinCode(token); 
          break;
      }

      if (!userProfile || !userProfile.email) {
        throw new RpcException('Email not found');
      }

      let existedUser = await this.userService.getByEmail(userProfile.email);

      if (existedUser) {
        existedUser = await this.userService.update(existedUser.id, {
          fbId: userProfile.fbId ? userProfile.fbId : existedUser.fbId,
          googleId: userProfile.googleId ? userProfile.googleId : existedUser.googleId,
          linkedinId: userProfile.linkedinId ? userProfile.linkedinId : existedUser.linkedinId,

          emailVerification: UserEmailVerificationStatus.VERIFIED,
        });

        return {
          ...existedUser,
          accessToken: this.userService.getAccessToken(existedUser),
        };
      }

      // * Create new user
      const user = await this.userService.create({
        ...userProfile,
        username: userProfile.email,
        emailVerification: UserEmailVerificationStatus.VERIFIED,
      });

      return {
        ...user,
        accessToken: this.userService.getAccessToken(user),
      };
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  @MessagePattern(AuthMessagePattern.SIGN_UP)
  async signUp(params: RegisterInput) {
    try {
      const { email, password } = params;
      const existedUser = await this.userService.getByEmail(email);

      if (existedUser) {
        throw new RpcException('Email already exists');
      }

      const user = await this.userService.create({
        email,
        password,
        // * FIXME:
        username: email,
      });

      const verifyCode = generateOTP();

      await this.userEmailVerificationService.create({
        email,
        password,
        verifyCode,
      });

      // * @TODO: Send otp to verify email
      await this.emailService.sendMail({
        to: email,
        subject: `Account Registration Verification - JobHopin`,
        html: loadVerifyEmailTemplate({
          verifyCode,
        }),
      });

      return user;
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  @MessagePattern(AuthMessagePattern.RESEND_VERIFICATION_CODE)
  async resendVerificationEmailCode(params: ResendVerificationCodeInput) {
    try {
      const { email } = params;
      const user = await this.userService.getByEmail(email);

      if (!user) {
        throw new RpcException('Email not found');
      }

      if (user.emailVerification === UserEmailVerificationStatus.VERIFIED) {
        throw new RpcException('Email has been verified'); 
      }

      const userEmailVerification = await this.userEmailVerificationService.findOne({
        email,
        verifyCodeStatus: UserEmailVerificationStatusType.NEW,
      });

      if (!userEmailVerification) {
        throw new RpcException('Email code not found');
      }

      const verifyCode = generateOTP();

      await this.userEmailVerificationService.update(userEmailVerification.id, {
        verifyCode,
      });

      // * @TODO: Send otp to verify email
      await this.emailService.sendMail({
        to: email,
        subject: `Account Registration Verification - JobHopin`,
        html: loadVerifyEmailTemplate({
          verifyCode,
        }),
      });

      return user;
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  @MessagePattern(AuthMessagePattern.VERIFY_EMAIL)
  async verifyEmail(params: VerifyEmailInput) {
    try {
      const { email, code } = params;
      const existedUser = await this.userService.getByEmail(email);

      const userEmailVerification = await this.userEmailVerificationService.findOne({
        email,
        verifyCodeStatus: UserEmailVerificationStatusType.NEW,
      });

      if (!userEmailVerification || (code !== userEmailVerification.verifyCode)) {
        throw new RpcException('Verification code invalid');
      }

      await this.userEmailVerificationService.update(userEmailVerification.id, {
        verifyCodeStatus: UserEmailVerificationStatusType.USED,
      });

      const user = await this.userService.update(existedUser.id, {
        emailVerification: UserEmailVerificationStatus.VERIFIED,
      });

      return user;
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  @MessagePattern(AuthMessagePattern.REQUEST_RESET_PASSWORD)
  async requestResetPassword(params: RequestResetPasswordInput) {
    try {
      const { email } = params;
      let user = await this.userService.getByEmail(email);

      if (!user) {
        throw new RpcException('User not found');
      }

      const resetTokenPass = await this.userService.generatePasswordToken(user.id);
      const resetPasswordLink = `${process.env.JOPHOPIN_DOMAIN}/reset-password?token=${resetTokenPass}`;

      // * TODO: send reset password email
      await this.emailService.sendMail({
        to: email,
        html: loadResetPasswordTemplate({
          resetPasswordLink,
        }),
        subject: `Thiết lập mật khẩu tài khoản JobHopin`,
      });

      return user;
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  @MessagePattern(AuthMessagePattern.CREATE_PASSWORD)
  async createPassword(params: CreatePasswordInput) {
    try {
      const { email, password, token } = params;
      const user = await this.userService.getByEmail(email);

      if (!user) {
        throw new RpcException('User not found');
      }

      if (!await this.userService.verifyTokenResetPassword(email, token)) {
        throw new RpcException('Token invalid');
      }

      await this.userService.changePassword(user.id, password);

      return user;
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  @MessagePattern(AuthMessagePattern.UPDATE_PASSWORD)
  async updatePassword(params: UpdatePasswordInput) {
    try {
      const { id, oldPassword, newPassword } = params;

      const user = await this.userService.findById(id);
      const isValid = await this.userService.authenticateLocal(user.email, oldPassword);

      if (!isValid) {
        throw new RpcException('Old password invalid');
      }

      // * Update new password
      await this.userService.changePassword(user.id, newPassword);

      return user;
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  @MessagePattern(AuthMessagePattern.GET_PROFILE)
  async getProfile(params: { id: string }) {
    try {
      const user = await this.userService.findById(params.id);
      
      if (!user) {
        throw new RpcException('User not found');
      }

      return user;
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  @MessagePattern(AuthMessagePattern.UPDATE_PROFILE)
  async updateProfile(params: UpdateProfileInput) {
    try {
      const { id, ...payload } = params;

      const user = await this.userService.update(id, {
        ...payload,
      });

      return user;
    } catch (err) {
      throw new RpcException(err.message);
    }
  }
}