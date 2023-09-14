import { BaseController, Controller, IBaseControllerProps } from '@joktec/core';
import { ApartmentService } from './apartment.service';
import { ApartmentInterceptor } from './hooks';
import { Apartment } from './models';

const props: IBaseControllerProps<Apartment> = {
  dto: Apartment,
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
