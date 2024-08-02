import { BaseController, Controller, IControllerProps } from '@joktec/core';
import { AuthGuard, RoleGuard } from '../../common';
import { Apartment } from '../../models/entities';
import { ApartmentService } from './apartment.service';
import { ApartmentCreateDto, ApartmentUpdateDto } from './models';

const props: IControllerProps<Apartment> = {
  dto: Apartment,
  customDto: { createDto: ApartmentCreateDto, updatedDto: ApartmentUpdateDto },
  guards: [AuthGuard, RoleGuard],
  useBearer: true,
};

@Controller('apartments')
export class ApartmentController extends BaseController<Apartment, string>(props) {
  constructor(protected apartmentService: ApartmentService) {
    super(apartmentService);
  }
}
