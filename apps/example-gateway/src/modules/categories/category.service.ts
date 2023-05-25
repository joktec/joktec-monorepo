import { BaseService, Injectable, OnModuleInit } from '@joktec/core';
import { Category } from './models';
import { CategoryRepo } from './category.repo';
import { MailerService } from '@joktec/mailer';

@Injectable()
export class CategoryService extends BaseService<Category, string> implements OnModuleInit {
  constructor(protected categoryRepo: CategoryRepo, private mailerService: MailerService) {
    super(categoryRepo);
  }

  async onModuleInit() {
    const html = await this.mailerService.buildHtml('verification.hbs', {
      fullName: 'Bảo Trần',
      verifyLink: 'https://google.com',
    });
    const mailRes = await this.mailerService.send({
      to: ['trangiabao1203@gmail.com', 'thangnv.uit@gmail.com', 'lehai.gdrs@gmail.com', 'gespe.tran@gmail.com'],
      subject: '[LF] Email Verification',
      html,
    });
    console.log('mailRes', mailRes);
  }
}
