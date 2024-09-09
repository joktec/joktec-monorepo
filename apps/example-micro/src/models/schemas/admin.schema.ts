import { Expose, linkTransform } from '@joktec/core';
import { Prop, Schema } from '@joktec/mongo';
import { appConfig } from '../../app.config';
import { IsCdnUrl } from '../../utils';
import { BaseSchema } from '../common';
import { AdminRole, AdminStatus } from '../constants';
import { AdminConfig } from '../objects';

@Schema({ collection: 'admins', textSearch: 'fistName,lastName,email', unique: ['email'], paranoid: true })
export class Admin extends BaseSchema {
  @Prop({ required: true, example: 'John' })
  fistName!: string;

  @Prop({ required: false, example: 'Doe' })
  lastName?: string;

  @Prop({ required: true, trim: true, lowercase: true, default: null, isEmail: true, example: 'admin@gmail.com' })
  email: string;

  @Prop({ required: false, default: null, example: 'https://cnd.domain.com/image.png' })
  @IsCdnUrl()
  avatar?: string;

  @Expose({ toPlainOnly: true })
  get thumbnail(): string {
    if (!this.avatar) return '';
    const { cdnUrl, resizeUrl } = appConfig.misc;
    const fullUrl = linkTransform(this.avatar, cdnUrl, 'absolute');
    return `${resizeUrl}/width=300,quality=100/${fullUrl}`;
  }

  @Prop({ exclude: true, swagger: { writeOnly: true } })
  password!: string;

  @Prop({ required: true, enum: AdminRole, default: AdminRole.ADMIN })
  role!: AdminRole;

  @Prop({ required: true, enum: AdminStatus, default: AdminStatus.ACTIVATED })
  status!: AdminStatus;

  @Prop({ type: AdminConfig, required: true, default: () => new AdminConfig() })
  config!: AdminConfig;
}
