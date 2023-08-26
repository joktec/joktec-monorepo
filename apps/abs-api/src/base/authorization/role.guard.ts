import { CanActivate, ExecutionContext, ForbiddenException, Injectable, Reflector } from '@joktec/core';
import { UserRole } from 'src/modules/users';
import { ROLES_KEY } from './role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;

    const { loggedUser } = context.switchToHttp().getRequest();
    const isActive = requiredRoles.some(role => loggedUser.role === role);
    if (!isActive) throw new ForbiddenException('PERMISSION_DENIED');
    return true;
  }
}
