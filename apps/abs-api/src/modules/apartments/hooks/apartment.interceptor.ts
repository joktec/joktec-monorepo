import {
  CallHandler,
  ExecutionContext,
  ICondition,
  Injectable,
  NestInterceptor,
  ValidateException,
} from '@joktec/core';
import { Observable } from 'rxjs';
import { ApartmentRepo } from '../apartment.repo';
import { Apartment } from '../models';

@Injectable()
export class ApartmentInterceptor implements NestInterceptor {
  constructor(private apartmentRepo: ApartmentRepo) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const { code, parentId } = req.body;

    if (req.method === 'POST' && code) {
      const condition: ICondition<Apartment> = { code };
      const apartment = await this.apartmentRepo.findOne({ condition });
      if (apartment) {
        throw new ValidateException({ code: ['APARTMENT_CODE_EXISTS'] });
      }
    }

    if (req.method === 'PUT' && code) {
      const condition: ICondition<Apartment> = { code, _id: { $ne: req.params.id } };
      if (code === 'OTHER') condition['parentId'] = parentId;

      const apartment = await this.apartmentRepo.findOne({ condition });
      if (apartment) {
        throw new ValidateException({ code: ['APARTMENT_CODE_EXISTS'] });
      }
    }

    if (req.method === 'DELETE') {
      const apartment = await this.apartmentRepo.findOne({
        condition: { _id: req.params.id },
        populate: { children: '*', rooms: '*' },
      });
      if (apartment?.rooms?.length) {
        throw new ValidateException({ code: ['APARTMENT_HAS_ROOMS'] });
      }
      if (apartment?.children?.length) {
        throw new ValidateException({ code: ['APARTMENT_HAS_CHILDREN'] });
      }
    }

    return next.handle();
  }
}
