import { BaseController, Controller, IControllerProps } from '@joktec/core';
import { AuthGuard, RoleGuard } from '../../base';
import { ApartmentService } from './apartment.service';
import { Apartment } from './models';

const props: IControllerProps<Apartment> = {
  dto: Apartment,
  bearer: AuthGuard,
  guards: RoleGuard,
};

@Controller('apartments')
export class ApartmentController extends BaseController<Apartment, string>(props) {
  constructor(protected apartmentService: ApartmentService) {
    super(apartmentService);
  }
}
