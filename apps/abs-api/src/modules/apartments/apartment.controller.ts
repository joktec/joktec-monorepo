import { BaseController, Controller, IBaseControllerProps, RequestMethod } from '@joktec/core';
import { RouteInfo } from '@nestjs/common/interfaces/middleware/middleware-configuration.interface';
import { AdminInterceptor } from '../../base';
import { ApartmentService } from './apartment.service';
import { ApartmentInterceptor } from './hooks';
import { Apartment } from './models';

const props: IBaseControllerProps<Apartment> = {
  dto: Apartment,
  hooks: {
    create: [AdminInterceptor, ApartmentInterceptor],
    update: [AdminInterceptor, ApartmentInterceptor],
    delete: [AdminInterceptor, ApartmentInterceptor],
  },
};

@Controller('apartments')
export class ApartmentController extends BaseController<Apartment, string>(props) {
  constructor(protected apartmentService: ApartmentService) {
    super(apartmentService);
  }

  static excludeRoute(): RouteInfo {
    return { path: 'apartments', method: RequestMethod.GET };
  }
}
