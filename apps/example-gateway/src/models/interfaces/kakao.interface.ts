export interface KakaoProfileResponse {
  id: number;
  kakao_account: KakaoAccount;
  properties: KakaoProperties;
}

export interface KakaoAccount {
  profile_needs_agreement: boolean;
  profile: KakaoProfile;
  email_needs_agreement: boolean;
  is_email_valid: boolean;
  is_email_verified: boolean;
  email: string;
  name_needs_agreement: boolean;
  name: string;
  age_range_needs_agreement: boolean;
  age_range: string;
  birthday_needs_agreement: boolean;
  birthday: string;
  gender_needs_agreement: boolean;
  gender: string;
}

export interface KakaoProfile {
  nickname: string;
  thumbnail_image_url: string;
  profile_image_url: string;
  is_default_image: boolean;
  is_default_nickname: boolean;
}

export interface KakaoProperties {
  nickname: string;
  thumbnail_image: string;
  profile_image: string;
  custom_field1: string;
  custom_field2: string;
}
