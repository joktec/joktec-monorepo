export interface GoogleTokenResponse {
  azp: string;
  aud: string;
  sub: string;
  hd: string;
  email: string;
  email_verified: string;
  at_hash: string;
  exp: string;
  iss: string;
  iat: string;
  alg: string;
  kid: string;
}

export interface GoogleProfileResponse {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
  hd: string;
}
