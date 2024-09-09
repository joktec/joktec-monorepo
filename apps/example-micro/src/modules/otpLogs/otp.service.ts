import { BaseService, Injectable } from '@joktec/core';
import { MailerService } from '@joktec/mailer';
import { I18nService, TranslateOptions } from 'nestjs-i18n';
import { LOCALE } from '../../app.constant';
import { SuccessResponse } from '../../common';
import { OTPType } from '../../models/constants';
import { Otp } from '../../models/schemas';
import { OtpRepo } from '../../repositories';

@Injectable()
export class OtpService extends BaseService<Otp, string> {
  constructor(
    protected otpRepo: OtpRepo,
    private i18nService: I18nService,
    private mailerService: MailerService,
  ) {
    super(otpRepo);
  }

  async sendEmail(otp: Otp): Promise<SuccessResponse> {
    const emailType: string = otp.type === OTPType.REGISTER ? 'VERIFY' : 'RESET';
    const template: string = otp.type === OTPType.REGISTER ? 'email-verify.hbs' : 'forgot-password.hbs';
    const opts: TranslateOptions = { lang: otp.locale };

    try {
      await this.mailerService.send({
        to: otp.email,
        subject: this.i18nService.t(`email.${emailType}.SUBJECT`, opts),
        template: {
          name: template,
          context: {
            title: this.i18nService.t(`email.${emailType}.TITLE`, opts),
            code: otp.publicCode,
            logo: 'https://dispatch.cdnser.be/www-renewal-2022/asset/images/dispatch-renewal-logo.png',
            content: { ...this.buildContent(otp) },
            footer: { ...this.buildFooter(otp.locale) },
          },
        },
      });
      return { success: true };
    } catch (err) {
      this.logService.error(err, 'Error when send email %s', err.message);
    }
    return { success: false };
  }

  private buildContent(otp: Otp) {
    const emailType = otp.type === OTPType.REGISTER ? 'VERIFY' : 'RESET';
    const contentKey = `email.${emailType}.CONTENT`;
    const opts: TranslateOptions = { lang: otp.locale };
    if (otp.type === OTPType.REGISTER) {
      return {
        heading: this.i18nService.t(`${contentKey}.HEADING`, opts),
        greeting: this.i18nService.t(`${contentKey}.GREETING`, opts),
        line1: this.i18nService.t(`${contentKey}.LINE_1`, opts),
        thank: this.i18nService.t(`${contentKey}.THANK`, opts),
        signature: this.i18nService.t(`${contentKey}.SIGNATURE`, opts),
      };
    }

    return {
      heading: this.i18nService.t(`${contentKey}.HEADING`, opts),
      greeting: this.i18nService.t(`${contentKey}.GREETING`, opts),
      line1: this.i18nService.t(`${contentKey}.LINE_1`, opts),
      line2: this.i18nService.t(`${contentKey}.LINE_2`, opts),
      line3: this.i18nService.t(`${contentKey}.LINE_3`, opts),
      line4: this.i18nService.t(`${contentKey}.LINE_4`, opts),
      thank: this.i18nService.t(`${contentKey}.THANK`, opts),
      signature: this.i18nService.t(`${contentKey}.SIGNATURE`, opts),
    };
  }

  private buildFooter(locale: LOCALE) {
    const footerKey = 'email.FOOTER';
    const opts: TranslateOptions = { lang: locale };
    return {
      disclaimer1: this.i18nService.t(`${footerKey}.DISCLAIMER_1`, opts),
      disclaimer2: this.i18nService.t(`${footerKey}.DISCLAIMER_2`, opts),
      companyName: this.i18nService.t(`${footerKey}.COMPANY_NAME`, opts),
      director: this.i18nService.t(`${footerKey}.DIRECTOR`, opts),
      hotline: this.i18nService.t(`${footerKey}.HOTLINE`, opts),
      email: this.i18nService.t(`${footerKey}.EMAIL`, opts),
      tel: this.i18nService.t(`${footerKey}.TEL`, opts),
      address: this.i18nService.t(`${footerKey}.ADDRESS`, opts),
      community: this.i18nService.t(`${footerKey}.COMMUNITY`, opts),
      policy: this.i18nService.t(`${footerKey}.POLICY`, opts),
      term: this.i18nService.t(`${footerKey}.TERM`, opts),
      copyright: this.i18nService.t(`${footerKey}.COPYRIGHT`, opts),
    };
  }
}
