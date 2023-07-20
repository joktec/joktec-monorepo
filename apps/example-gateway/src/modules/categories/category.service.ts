import { BaseService, Injectable, OnModuleInit } from '@joktec/core';
import { MailerService } from '@joktec/mailer';
import { CategoryRepo } from './category.repo';
import { Category } from './models';

@Injectable()
export class CategoryService extends BaseService<Category, string> implements OnModuleInit {
  constructor(protected categoryRepo: CategoryRepo, private mailerService: MailerService) {
    super(categoryRepo);
  }

  async onModuleInit() {
    // const mailRes = await this.mailerService.send({
    //   to: 'Lê Hải <lehai.grds@gmail.com>',
    //   subject: '[LF] Email Verification',
    //   template: {
    //     filename: 'verification.hbs',
    //     variables: {
    //       fullName: 'Lê Hải',
    //       verifyLink: 'https://google.com',
    //     },
    //   },
    // });
    // console.log('mailRes', mailRes);
  }
}
