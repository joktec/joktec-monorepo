export interface GravatarPhoto {
  value: string;
  type: string;
}

export interface GravatarUrl {
  value: string;
  title?: string;
}

export interface GravatarName {
  formatted?: string;
  givenName?: string;
  familyName?: string;
  middleName?: string;
  honorificPrefix?: string;
  honorificSuffix?: string;
}

export interface GravatarEmail {
  value: string;
  primary?: boolean;
  verified?: boolean;
}

export interface GravatarAccount {
  domain: string;
  username: string;
  display: string;
  url: string;
}

export interface GravatarEntry {
  id: string;
  hash: string;
  requestHash: string;
  profileUrl: string;
  preferredUsername?: string;
  thumbnailUrl?: string;
  photos?: GravatarPhoto[];
  name?: GravatarName;
  displayName?: string;
  aboutMe?: string;
  currentLocation?: string;
  emails?: GravatarEmail[];
  urls?: GravatarUrl[];
  accounts?: GravatarAccount[];
  verifiedAccounts?: GravatarAccount[];
}

export interface GravatarResponse {
  entry: GravatarEntry[];
}

export interface Gravatar {
  providerId?: string;
  photoUrl?: string;
  thumbnailUrl?: string;
  fullName?: string;
  currentLocation?: string;
}
