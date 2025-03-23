import {
  BaseService,
  ClientProxy,
  Inject,
  Injectable,
  IPaginationResponse,
  IUserAgent,
  JwtPayload,
  JwtService,
  JwtToken,
  REQUEST,
} from '@joktec/core';
import { IMongoRequest } from '@joktec/mongo';
import { generateUUID } from '@joktec/utils';
import { I18nContext } from 'nestjs-i18n';
import { appConfig } from '../../app.config';
import { IRequest, TRANSPORT } from '../../app.constant';
import { AuthProviderType, AuthScope, SessionStatus } from '../../models/constants';
import { Session, User } from '../../models/schemas';
import { SessionRepo } from '../../repositories';

@Injectable()
export class SessionService extends BaseService<Session, string> {
  constructor(
    protected sessionRepo: SessionRepo,
    private jwtService: JwtService,
    @Inject(TRANSPORT.PROXY.USER) private userClient: ClientProxy,
    @Inject(REQUEST) public request: IRequest,
  ) {
    super(sessionRepo);
  }

  async paginate(query: IMongoRequest<Session>): Promise<IPaginationResponse<Session>> {
    Object.assign(query.condition, { userType: User.name, userRefId: this.request.loggedUser._id });
    return super.paginate(query);
  }

  async findOne(query: IMongoRequest<Session>): Promise<Session> {
    Object.assign(query.condition, { userType: User.name, userRefId: this.request.loggedUser._id });
    return super.findOne(query);
  }

  async findByTokenId(tokenId: string): Promise<Session> {
    return this.sessionRepo.findOne({ tokenId });
  }

  async registerToken(
    user: User,
    scope: AuthScope,
    providerType: AuthProviderType,
    fcmToken?: string,
  ): Promise<JwtToken> {
    const userAgent: IUserAgent = this.request.userAgent;
    const issuer = this.configService.get<string>('gateway.swagger.server', 'http://localhost:9011');
    const payload: JwtPayload = {
      iss: issuer,
      sub: user._id,
      aud: appConfig.name.replace('@', '').replace('/', '-'),
      jti: generateUUID(),
      scope,
      provider: providerType,
      userId: user._id,
      email: user.email,
      role: user.role,
    };
    const token = await this.jwtService.sign(payload);
    const session = await this.sessionRepo.create({
      tokenId: payload.jti,
      expiresAt: token.expiredAt,
      status: SessionStatus.ACTIVATED,
      userType: User.name,
      userRefId: payload.sub,
      fcmToken: fcmToken || null,
      deviceInfo: {
        deviceModel: this.request.deviceModel,
        deviceOs: this.request.deviceOs,
        deviceId: this.request.deviceId,
        osVersion: this.request.osVersion,
      },
      appVersion: this.request.appVersion,
      appBuild: this.request.appBuild,
      ipAddress: this.request.geoIp?.ipAddress,
      userAgent: userAgent?.ua || this.request.headers['user-agent'],
      locale: I18nContext.current()?.lang || user.config.language,
    });

    if (session.fcmToken) {
      this.userClient.emit({ cmd: 'User.subscribeToTopic' }, { user, session });
    }

    return token;
  }
}
