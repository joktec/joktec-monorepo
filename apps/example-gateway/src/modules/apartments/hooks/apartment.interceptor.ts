import { CallHandler, ExecutionContext, ExpressRequest, Injectable, NestInterceptor } from '@joktec/core';
import { Observable } from 'rxjs';
import { ApartmentRepo } from '../apartment.repo';

@Injectable()
export class ApartmentInterceptor implements NestInterceptor {
  constructor(private apartmentRepo: ApartmentRepo) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest<ExpressRequest>();
    return next.handle();
  }
}
