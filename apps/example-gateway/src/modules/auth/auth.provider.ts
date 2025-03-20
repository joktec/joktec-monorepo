import { BadRequestException, ConfigService, Injectable, LogService } from '@joktec/core';
import { FirebaseService } from '@joktec/firebase';
import { HttpService } from '@joktec/http';
import { hashString } from '@joktec/utils';
import appleSignin from 'apple-signin-auth';
import gravatar from 'gravatar';
import { get, head, isString } from 'lodash';
import { GravatarEntry, GravatarResponse } from '../../models/common';
import { AuthProviderType } from '../../models/constants';
import {
  AmazonProfileResponse,
  AuthProviderProfile,
  FacebookProfileResponse,
  GoogleProfileResponse,
  KakaoProfileResponse,
  NavarProfileData,
  NaverBaseResponse,
} from '../../models/interfaces';
import { AuthAppleProvider, BaseProviderConfig } from './configs';

@Injectable()
export class AuthProvider {
  constructor(
    private configService: ConfigService,
    private logger: LogService,
    private httpService: HttpService,
    private firebaseService: FirebaseService,
  ) {
    this.logger.setContext(AuthProvider.name);
  }

  /**
   * See: https://gravatar.com/site/check/
   * https://www.npmjs.com/package/gravatar
   * @param email
   */
  async getDefaultProfile(email: string): Promise<AuthProviderProfile> {
    const defProfile: AuthProviderProfile = {
      type: AuthProviderType.DEFAULT,
      email,
      providerId: hashString(email, AuthProviderType.DEFAULT),
      profileName: email,
      profileImage: gravatar.url(email, { protocol: 'https', s: '100' }),
    };

    try {
      const profileUrl = gravatar.profile_url(email, { protocol: 'https', format: 'json' }, true);
      const response = await this.httpService.request<string | GravatarResponse>({ method: 'GET', url: profileUrl });
      const json = response.data;
      this.logger.info({ profile: json }, 'getDefaultProfile');

      if (isString(json)) return defProfile;
      const profile: GravatarEntry = head(json.entry);
      return {
        ...defProfile,
        providerId: profile?.hash || profile?.id || defProfile.providerId,
        profileName: profile?.name?.formatted || profile?.displayName || defProfile.profileName,
      };
    } catch (err) {
      const dataErr: any = err.data?.data || err;
      this.logger.error(dataErr, 'Error when get Gravatar profile: %s', err.message);
    }
    return defProfile;
  }

  /**
   * See: https://developers.kakao.com/tool/rest-api/open/get/v2-user-me
   * TODO: Account need to verify business to get full profile info
   * @param providerToken
   */
  async getKaKaoProfile(providerToken: string): Promise<AuthProviderProfile> {
    const cfg = this.configService.parse(BaseProviderConfig, 'auth.kakao');
    if (!cfg.enable) throw new BadRequestException('auth.KAKAO_IS_MAINTENANCE');

    try {
      const res = await this.httpService.request<KakaoProfileResponse>({
        baseURL: cfg.url,
        method: 'POST',
        url: 'v2/user/me',
        headers: {
          Authorization: `Bearer ${providerToken}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        data: { property_keys: ['kakao_account.email'] },
      });
      this.logger.info({ profile: res.data }, 'getKaKaoProfile');
      const { id, kakao_account } = res.data;
      return {
        type: AuthProviderType.KAKAO,
        email: get(kakao_account, 'email', `${String(id)}@kakao.com`),
        providerId: String(id),
        profileName: kakao_account?.name || kakao_account?.profile?.nickname || `User ${String(id)}`,
        profileImage: kakao_account?.profile?.profile_image_url,
      };
    } catch (err) {
      const dataErr: any = err.data?.data || err;
      this.logger.error(dataErr, 'Error when get Kakao profile: %s', err.message);
      throw new BadRequestException('auth.KAKAO_TOKEN_INVALID');
    }
  }

  /**
   * See: https://developers.naver.com/docs/login/profile/profile.md
   * @param providerToken
   */
  async getNaverProfile(providerToken: string): Promise<AuthProviderProfile> {
    const cfg = this.configService.parse(BaseProviderConfig, 'auth.naver');
    if (!cfg.enable) throw new BadRequestException('auth.NAVER_IS_MAINTENANCE');

    try {
      const res = await this.httpService.request<NaverBaseResponse<NavarProfileData>>({
        baseURL: cfg.url,
        method: 'GET',
        url: 'v1/nid/me',
        headers: { Authorization: `Bearer ${providerToken}` },
      });

      this.logger.info({ profile: res.data }, 'getNaverProfile');
      const response = res.data.response;
      return {
        type: AuthProviderType.NAVER,
        email: response.email,
        providerId: response.id,
        profileName: response.nickname || response.name,
        profileImage: response.profile_image,
      };
    } catch (err) {
      const dataErr: any = err.data?.data || err;
      this.logger.error(dataErr, 'Error when get Naver profile: %s', err.message);
      throw new BadRequestException('auth.NAVER_TOKEN_INVALID');
    }
  }

  /**
   * See: https://developer.amazon.com/docs/login-with-amazon/obtain-customer-profile.html
   * @param providerToken
   */
  async getAmazonProfile(providerToken: string): Promise<AuthProviderProfile> {
    const cfg = this.configService.parse(BaseProviderConfig, 'auth.amazon');
    if (!cfg.enable) throw new BadRequestException('auth.AMAZON_IS_MAINTENANCE');

    try {
      const res = await this.httpService.request<AmazonProfileResponse>({
        baseURL: cfg.url,
        method: 'GET',
        url: `user/profile`,
        headers: { Authorization: `Bearer ${providerToken}` },
      });
      this.logger.info({ profile: res.data }, 'getAmazonProfile');
      const data = res.data;
      return {
        type: AuthProviderType.NAVER,
        email: data.email,
        providerId: data.user_id,
        profileName: data.name,
        profileImage: '',
      };
    } catch (err) {
      const dataErr: any = err.data?.data || err;
      this.logger.error(dataErr, 'Error when get Amazon profile: %s', err.message);
      throw new BadRequestException('auth.AMAZON_TOKEN_INVALID');
    }
  }

  /**
   * See: https://www.npmjs.com/package/apple-signin-auth
   * @param providerToken
   */
  async getAppleProfile(providerToken: string): Promise<AuthProviderProfile> {
    const cfg = this.configService.parse(AuthAppleProvider, 'auth.apple');
    if (!cfg.enable) throw new BadRequestException('auth.APPLE_IS_MAINTENANCE');

    try {
      const data: AuthProviderProfile = { type: AuthProviderType.APPLE, profileName: '', profileImage: '' };
      const res = await appleSignin.verifyIdToken(providerToken, {
        audience: cfg.audience,
        ignoreExpiration: false,
      });
      this.logger.info({ profile: res }, 'getAppleProfile');
      Object.assign(data, { email: res.email, providerId: res.sub });
      return data;
    } catch (err) {
      const dataErr: any = err.data?.data || err;
      this.logger.error(dataErr, 'Error when get Apple profile: %s', err.message);
      throw new BadRequestException('auth.APPLE_TOKEN_INVALID');
    }
  }

  /**
   * See: https://developers.facebook.com/docs/graph-api/overview/#me
   * @param providerToken
   */
  async getFacebookProfile(providerToken: string): Promise<AuthProviderProfile> {
    const cfg = this.configService.parse(BaseProviderConfig, 'auth.facebook');
    if (!cfg.enable) throw new BadRequestException('auth.FACEBOOK_IS_MAINTENANCE');

    try {
      const res = await this.httpService.request<FacebookProfileResponse>({
        baseURL: cfg.url,
        method: 'GET',
        url: `me?fields=id,name,email,picture&access_token=${providerToken}`,
      });
      this.logger.info({ profile: res.data }, 'getFacebookProfile');
      const data = res.data;
      return {
        type: AuthProviderType.FACEBOOK,
        email: data.email,
        providerId: String(data.id),
        profileName: data.name,
        profileImage: isString(data.picture) ? data.picture : get(data.picture, ['data', 'url']),
      };
    } catch (err) {
      const dataErr: any = err.data?.data || err;
      this.logger.error(dataErr, 'Error when get Facebook profile: %s', err.message);
      throw new BadRequestException('auth.FACEBOOK_TOKEN_INVALID', dataErr);
    }
  }

  /**
   * See: https://www.oauth.com/oauth2-servers/signing-in-with-google/verifying-the-user-info/
   * @param providerToken
   */
  async getGoogleProfile(providerToken: string): Promise<AuthProviderProfile> {
    const cfg = this.configService.parse(BaseProviderConfig, 'auth.google');
    if (!cfg.enable) throw new BadRequestException('auth.GOOGLE_IS_MAINTENANCE');

    try {
      const res = await this.httpService.request<GoogleProfileResponse>({
        baseURL: cfg.url,
        method: 'GET',
        url: `oauth2/v3/userinfo`,
        headers: { Authorization: `Bearer ${providerToken}` },
      });
      this.logger.info({ profile: res.data }, 'getGoogleProfile');
      const profileData = res.data;
      return {
        type: AuthProviderType.GOOGLE,
        email: profileData.email,
        providerId: profileData.sub,
        profileName: profileData.name || '',
        profileImage: profileData.picture || '',
      };
    } catch (err) {
      const dataErr: any = err.data?.data || err;
      this.logger.error(dataErr, 'Error when get Google profile: %s', err.message);
      throw new BadRequestException('auth.GOOGLE_TOKEN_INVALID', dataErr);
    }
  }

  async getFirebaseProfile(providerToken: string): Promise<AuthProviderProfile> {
    const enable = this.configService.get<boolean>('auth.firebase');
    if (!enable) throw new BadRequestException('auth.FIREBASE_IS_MAINTENANCE');

    try {
      const data: AuthProviderProfile = { type: AuthProviderType.FIREBASE };
      const res = await this.firebaseService.auth().getUser(providerToken);
      this.logger.info({ profile: res }, 'getFirebaseProfile');
      Object.assign(data, {
        email: res.email,
        providerId: res.uid,
        profileName: res.displayName,
        profileImage: res.photoURL,
      });
      return data;
    } catch (err) {
      const dataErr: any = err.data?.data || err;
      this.logger.error(dataErr, 'Error when get Firebase profile: %s', err.message);
      throw new BadRequestException('auth.FIREBASE_TOKEN_INVALID', err);
    }
  }
}
