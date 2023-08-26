import { BullModule, Module } from '@joktec/core';
import { RoomModule } from '../rooms';
import {
  OrderCancelInterceptor,
  OrderCheckinInterceptor,
  OrderCheckoutInterceptor,
  OrderConfirmInterceptor,
  OrderEditableInterceptor,
  OrderRejectInterceptor,
  OrderSubmittedInterceptor,
} from './hooks';
import { OrderConsumer } from './order.consumer';
import { OrderController } from './order.controller';
import { OrderRepo } from './order.repo';
import { OrderService } from './order.service';

@Module({
  controllers: [OrderController],
  imports: [BullModule.registerQueue({ name: 'order' }), RoomModule],
  providers: [
    OrderRepo,
    OrderService,
    OrderConsumer,
    OrderSubmittedInterceptor,
    OrderEditableInterceptor,
    OrderCancelInterceptor,
    OrderCheckinInterceptor,
    OrderCheckoutInterceptor,
    OrderConfirmInterceptor,
    OrderRejectInterceptor,
  ],
  exports: [OrderService, OrderRepo],
})
export class OrderModule {}
