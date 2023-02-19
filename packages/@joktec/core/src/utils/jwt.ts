import * as jwt from 'jwt-simple';
import { TAlgorithm } from 'jwt-simple';

export interface ITokenUser {
  readonly userId: string;
  readonly organizationId?: string;
  readonly email?: string;
}

const JWT_ALGORITHM_DEFAULT = 'HS256';
const EXPIRED_BY_DAYS = +(process.env.JWT_TOKEN_EXPIRES || 30);

export function encodeJwtToken(payload: ITokenUser, algorithm: TAlgorithm = JWT_ALGORITHM_DEFAULT): string {
  const expires = new Date();
  expires.setDate(expires.getDate() + EXPIRED_BY_DAYS);

  const token = jwt.encode(
    {
      iat: new Date(),
      exp: expires,
      userId: payload.userId,
      email: payload.email,
      organizationId: payload.organizationId,
    },
    process.env.JWT_TOKEN_SECRET as string,
    algorithm,
  );
  return token;
}

export function decodeJwtToken(token: string, algorithm: TAlgorithm = JWT_ALGORITHM_DEFAULT) {
  const claim = jwt.decode(token, process.env.JWT_TOKEN_SECRET as string, false, algorithm);
  return claim;
}
