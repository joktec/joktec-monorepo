import { JwtService } from '@nestjs/jwt';

export const AuthenticationContext = (context) => {
  // check jwt token
  const { headers } = context;
  if (!headers.authorization) {
    throw new Error('Headers not found');
  }
  const [prefix, token] = headers.authorization.split(' ');
  if (prefix !== 'Bearer') {
    throw new Error('Token wrong format');
  }
  const secret = Buffer.from(`${process.env.JWT_TOKEN_SECRET}`, 'base64');
  const jwtService = new JwtService();
  const decode: any = jwtService.verify(token, {
    secret,
  });
  if (!decode) {
    throw new Error('Token is invalid');
  }
  //TODO:: check role user
  return true;
};
