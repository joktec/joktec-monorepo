import { SetMetadata } from '@joktec/core';
import { UserRole } from '../../modules/users';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
