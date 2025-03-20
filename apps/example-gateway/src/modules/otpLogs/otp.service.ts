import { BaseService, Injectable } from '@joktec/core';
import { generateOTP, generateUUID } from '@joktec/utils';
import moment from 'moment';
import { appConfig } from '../../app.config';
import { LOCALE } from '../../app.constant';
import { OTPStatus, OTPType } from '../../models/constants';
import { Otp } from '../../models/schemas';
import { OtpRepo } from '../../repositories';

@Injectable()
export class OtpService extends BaseService<Otp, string> {
  constructor(protected otpRepo: OtpRepo) {
    super(otpRepo);
  }

  async findLastOtpByEmail(email: string, type: OTPType): Promise<Otp[]> {
    return this.otpRepo.find({
      condition: {
        email,
        type,
        createdAt: {
          $gte: moment().startOf('date').toDate(),
          $lte: moment().endOf('date').toDate(),
        },
        status: { $nin: [OTPStatus.DISABLED, OTPStatus.SUCCESS] },
      },
      sort: { createdAt: 'desc' },
    });
  }

  async findByPrivateCode(privateCode: string): Promise<Otp> {
    const results = await this.otpRepo.find({ condition: { privateCode } });
    return results[0];
  }

  async findByActiveCode(activeCode: string): Promise<Otp> {
    return this.otpRepo.findOne({ activeCode }, { sort: { createdAt: 'desc' } });
  }

  async createOtp(email: string, type: OTPType, expired: number, locale: string): Promise<Otp> {
    return this.otpRepo.create({
      email: email,
      publicCode: appConfig?.isProd ? generateOTP(6) : '000000',
      privateCode: generateUUID({ prefix: type }),
      locale: locale as LOCALE,
      type,
      retry: 1,
      expiredInSeconds: expired,
      expired: moment().startOf('ms').add(expired, 'second').toDate(),
      status: OTPStatus.ACTIVATED,
    });
  }

  async revokeOtp(lastOTP: Otp): Promise<Otp> {
    return this.otpRepo.update(lastOTP._id, { status: OTPStatus.EXPIRED });
  }

  async extendOtp(lastOTP: Otp, expired: number): Promise<Otp> {
    await this.revokeOtp(lastOTP);
    const retry: number = lastOTP.retry + 1;
    const expiredInSeconds: number = retry * expired;
    return this.otpRepo.create({
      email: lastOTP.email,
      publicCode: appConfig?.isProd ? generateOTP(6) : '000000',
      privateCode: generateUUID({ prefix: lastOTP.type }),
      type: lastOTP.type,
      retry,
      expiredInSeconds,
      expired: moment().startOf('ms').add(expiredInSeconds, 'second').toDate(),
      status: OTPStatus.ACTIVATED,
    });
  }

  async confirmOtp(lastOtp: Otp): Promise<Otp> {
    return this.otpRepo.update(lastOtp._id, {
      activeCode: generateUUID({ prefix: lastOtp.type }),
      status: OTPStatus.VERIFIED,
    });
  }

  async finishOtp(lastOtp: Otp): Promise<Otp> {
    return this.otpRepo.update(lastOtp._id, { status: OTPStatus.SUCCESS });
  }
}
