import { IsHexColor } from '@joktec/core';
import { Prop, PropType, Schema } from '@joktec/mongo';
import { IsCdnUrl } from '../../utils';
import { CategoryPlaceholder } from './category-placeholder';
import { I18nText, I18nTransform } from './i18n-text';

@Schema({ schemaOptions: { _id: false, timestamps: false } })
export class CategoryWhiteLabel {
  @Prop({ default: null, decorators: [IsHexColor()], example: '#FFFFFF' })
  primaryColor?: string;

  @Prop({ default: null, example: 'https://example.com/image.png' })
  @IsCdnUrl()
  banner?: string;

  @Prop({ default: null, example: 'https://example.com/image.png' })
  @IsCdnUrl()
  background?: string;

  @Prop({ type: CategoryPlaceholder, default: new CategoryPlaceholder() })
  finderPlaceholder?: CategoryPlaceholder;

  @Prop({ type: CategoryPlaceholder, default: new CategoryPlaceholder() })
  ownerPlaceholder?: CategoryPlaceholder;

  @Prop({ default: null, example: 'https://example.com/image.png' })
  @IsCdnUrl()
  finderBanner?: string;

  @Prop({ default: null, example: 'https://example.com/image.png' })
  @IsCdnUrl()
  ownerBanner?: string;

  @Prop({ default: null, example: 'Thông tin thú cưng' })
  @I18nTransform()
  formTitle?: I18nText;

  @Prop({ default: null, example: 'Bạn thất lạc thú cưng gì?' })
  formLabel?: string;

  @Prop({ default: null, example: 'https://example.com/image.png' })
  @IsCdnUrl()
  formIcon?: string;

  @Prop({ type: [String], default: [], example: ['Đánh rơi', 'Để quên', 'Bị mất cắp', 'Không rõ'] }, PropType.ARRAY)
  finderReasons?: string[];

  @Prop({ type: [String], default: [], example: ['Đang tạm giữ', 'Giao nộp cho Công an'] }, PropType.ARRAY)
  ownerReasons?: string[];
}
