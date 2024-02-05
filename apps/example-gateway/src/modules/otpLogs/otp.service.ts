import { BaseService, Injectable } from '@joktec/core';
import moment from 'moment';
import { OTPStatus, OTPType } from '../../models/constants';
import { Otp } from '../../models/entities';
import { OtpRepo } from '../../repositories';

@Injectable()
export class OtpService extends BaseService<Otp, string> {
  constructor(protected otpRepo: OtpRepo) {
    super(otpRepo);
  }

  async findLastOtpByPhone(phone: string, type: OTPType): Promise<Otp[]> {
    return this.otpRepo.find({
      condition: {
        phone,
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
    return this.otpRepo.findOne({ condition: { activeCode }, sort: { createdAt: 'desc' } });
  }

  async deleteByPhone(phoneOrEmail: string): Promise<number> {
    const opts = await this.otpRepo.find({
      condition: {
        $or: [{ phone: phoneOrEmail }, { email: phoneOrEmail }],
      },
    });
    const res = await Promise.all(opts.map(o => this.otpRepo.delete({ _id: o._id }, { force: true })));
    return res.length;
  }
}
