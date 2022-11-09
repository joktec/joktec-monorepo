import * as Crypto from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseService, UserEmailVerificationStatus } from '@jobhopin/core';
import { JwtService } from '@nestjs/jwt';
import { User } from '@jobhopin/core';

import { UserDocument } from './schemas/users.schema';
import {
  COLLECTION_NAME,
  PASSWORD_TOKEN_LENGTH,
  PASSWORD_TOKEN_EXPIRY,
} from './users.constants';

const generateToken = async (length: number) => {
  return new Promise((resolve, reject) =>
    Crypto.randomBytes(length, (err, buffer) => {
      if (err) {
        reject(err);
      }

      resolve(buffer.toString('hex'));
    }),
  );
};

export class UserService extends BaseService<UserDocument> {
  constructor(
    @InjectModel(COLLECTION_NAME) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {
    super(userModel);
  }

  transform(document: any) {
    if (!document) {
      return;
    }

    const {
      password,
      expireResetPass,
      tokenResetPass,
      legacyPassword,
      ...restUser
    } = document && document.toJSON();

    return restUser;
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.userModel
      .findOne({
        email,
      })
      .exec();

    if (!user) {
      return;
    }

    return this.transform(user);
  }

  async verifyTokenResetPassword(
    email: string,
    token: string,
  ): Promise<boolean> {
    const user = await this.userModel
      .findOne({
        email,
      })
      .exec();

    if (!user) {
      throw new Error('User not found');
    }

    if (user.tokenResetPass !== token) {
      throw new Error('Token invalid');
    }

    if (new Date(user.expireResetPass) < new Date()) {
      throw new Error('Token expired');
    }

    return true;
  }

  getAccessToken(user: User): string {
    const secret = Buffer.from(`${process.env.JWT_TOKEN_SECRET}`, 'base64');

    return this.jwtService.sign(
      {
        sub: user.id,
        userId: user.id,
        organizationId: '', // @TODO:
        email: user.email,
      },
      {
        secret,
      },
    );
  }

  async authenticateLocal(username: string, password: string): Promise<User> {
    const user = await this.userModel
      .findOne({
        $or: [
          {
            email: username,
          },
          {
            username: username,
          },
        ],
      })
      .exec();

    if (!user) {
      throw new Error('User not found');
    }

    if (!(await user.$authenticateLocal(password))) {
      throw new Error('Password invalid');
    }

    if (user.emailVerification !== UserEmailVerificationStatus.VERIFIED) {
      throw new Error('Email not verified');
    }

    return {
      ...this.transform(user),
      accessToken: this.getAccessToken(user),
    };
  }

  async generatePasswordToken(id: string): Promise<string> {
    const [token, document] = await Promise.all([
      generateToken(PASSWORD_TOKEN_LENGTH),
      this.userModel.findById(id).exec(),
    ]);

    await (document as UserDocument).$update({
      tokenResetPass: token,
      expireResetPass: Date.now() + PASSWORD_TOKEN_EXPIRY,
    });

    return token as string;
  }

  async changePassword(id: string, password: string): Promise<User> {
    const document = await this.userModel.findById(id).exec();
    await document.$update({
      password,
      legacyPassword: document.password,
      tokenResetPass: '',
    });

    return this.transform(document);
  }
}
