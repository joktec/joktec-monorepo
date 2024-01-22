import gravatar from 'gravatar';
import { head } from 'lodash';
import fetch from 'node-fetch';

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
  photoUrl?: string;
  thumbnailUrl?: string;
  fullName?: string;
  currentLocation?: string;
}

export const getGravatar = async (email: string): Promise<Gravatar> => {
  if (!email) return null;
  const photoUrl = gravatar.url(email, { s: '200', r: 'pg', d: 'robohash' }, true);
  const thumbnailUrl = gravatar.url(email, { s: '80', r: 'pg', d: 'robohash' }, true);
  try {
    const profileUrl = gravatar.profile_url(email, { protocol: 'https', format: 'json' }, true);
    const response = await fetch(profileUrl);
    const json = await response.json();
    if (json === 'User not found') {
      return { photoUrl, thumbnailUrl } as Gravatar;
    }

    const profile = head((json as GravatarResponse).entry);
    return {
      photoUrl,
      thumbnailUrl,
      fullName: profile?.name?.formatted || profile?.displayName,
      currentLocation: profile?.currentLocation,
    } as Gravatar;
  } catch (err) {
    console.log('getGravatar', err);
  }
  return { photoUrl, thumbnailUrl } as Gravatar;
};
