import { BaseController, Controller, IControllerProps } from '@joktec/core';
import { AuthGuard, RoleGuard } from '../../base';
import { ApartmentService } from './apartment.service';
import { ApartmentInterceptor } from './hooks';
import { Apartment } from './models';

const props: IControllerProps<Apartment> = {
  dto: Apartment,
  bearer: AuthGuard,
  guards: RoleGuard,
  hooks: {
    create: [ApartmentInterceptor],
    update: [ApartmentInterceptor],
    delete: [ApartmentInterceptor],
  },
};

@Controller('apartments')
export class ApartmentController extends BaseController<Apartment, string>(props) {
  constructor(protected apartmentService: ApartmentService) {
    super(apartmentService);
  }
}
