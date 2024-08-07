import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  BaseController,
  Controller,
  ExpressRequest,
  IControllerProps,
  Param,
  Patch,
  Req,
  UseInterceptors,
} from '@joktec/core';
import { AuthGuard, RoleGuard, Roles } from '../../common';
import { UserRole } from '../../models/constants';
import { Order } from '../../models/entities';
import {
  OrderCancelInterceptor,
  OrderCheckinInterceptor,
  OrderCheckoutInterceptor,
  OrderConfirmInterceptor,
  OrderEditableInterceptor,
  OrderRejectInterceptor,
  OrderSubmittedInterceptor,
} from './hooks';
import { OrderRejectDto } from './models';
import { OrderService } from './order.service';

const props: IControllerProps<Order> = {
  dto: Order,
  guards: [AuthGuard, RoleGuard],
  useBearer: true,
  create: { hooks: [OrderSubmittedInterceptor] },
  update: { hooks: [OrderEditableInterceptor] },
  delete: { disable: true },
};

@Controller('orders')
export class OrderController extends BaseController<Order, string>(props) {
  constructor(protected orderService: OrderService) {
    super(orderService);
  }

  @Patch('/:id/cancel')
  @ApiOperation({ summary: `User Cancel` })
  @ApiOkResponse({ type: Order })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiBody({ type: OrderRejectDto })
  @Roles(UserRole.USER)
  @UseInterceptors(OrderEditableInterceptor, OrderCancelInterceptor)
  async cancel(@Param('id') id: string, @Req() req: ExpressRequest): Promise<Order> {
    return this.orderService.update(id, req.body);
  }

  @Patch('/:id/checkin')
  @ApiOperation({ summary: `User checkin` })
  @ApiOkResponse({ type: Order })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @Roles(UserRole.USER)
  @UseInterceptors(OrderCheckinInterceptor)
  async checkin(@Param('id') id: string, @Req() req: ExpressRequest): Promise<Order> {
    return this.orderService.update(id, req.body);
  }

  @Patch('/:id/checkout')
  @ApiOperation({ summary: `User checkout` })
  @ApiOkResponse({ type: Order })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @Roles(UserRole.USER)
  @UseInterceptors(OrderCheckoutInterceptor)
  async checkout(@Param('id') id: string, @Req() req: ExpressRequest): Promise<Order> {
    return this.orderService.update(id, req.body);
  }

  @Patch('/:id/confirm')
  @ApiOperation({ summary: `Admin confirm` })
  @ApiOkResponse({ type: Order })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @Roles(UserRole.ADMIN)
  @UseInterceptors(OrderConfirmInterceptor)
  async confirm(@Param('id') id: string, @Req() req: ExpressRequest): Promise<Order> {
    return this.orderService.update(id, req.body);
  }

  @Patch('/:id/reject')
  @ApiOperation({ summary: `Admin reject` })
  @ApiOkResponse({ type: Order })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiBody({ type: OrderRejectDto })
  @Roles(UserRole.ADMIN)
  @UseInterceptors(OrderRejectInterceptor)
  async reject(@Param('id') id: string, @Req() req: ExpressRequest): Promise<Order> {
    return this.orderService.update(id, req.body);
  }
}
