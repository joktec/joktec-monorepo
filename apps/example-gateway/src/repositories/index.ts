import { ApartmentRepo } from './common/apartment.repo';
import { AssetRepo } from './common/asset.repo';
import { CategoryRepo } from './common/category.repo';
import { OrderRepo } from './common/order.repo';
import { OtpRepo } from './common/otp.repo';
import { RoomRepo } from './common/room.repo';
import { SessionRepo } from './common/session.repo';
import { SettingRepo } from './common/setting.repo';
import { UserRepo } from './common/user.repo';

export const Repositories = [
  ApartmentRepo,
  AssetRepo,
  CategoryRepo,
  OrderRepo,
  OtpRepo,
  RoomRepo,
  SessionRepo,
  SettingRepo,
  UserRepo,
];

export * from './repository.module';
export * from './common/apartment.repo';
export * from './common/asset.repo';
export * from './common/category.repo';
export * from './common/order.repo';
export * from './common/otp.repo';
export * from './common/room.repo';
export * from './common/session.repo';
export * from './common/setting.repo';
export * from './common/user.repo';
