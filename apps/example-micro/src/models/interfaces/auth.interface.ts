import { AuthProviderType } from '../constants';

export interface AuthProviderProfile {
  type: AuthProviderType;
  email?: string;
  providerId?: string;
  profileName?: string;
  profileImage?: string;
}
