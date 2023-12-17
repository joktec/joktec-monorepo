import { ApartmentRepo } from './apartments';
import { AssetRepo } from './assets';
import { CategoryRepo } from './categories';
import { OrderRepo } from './orders';
import { OtpRepo } from './otpLogs';
import { RoomRepo } from './rooms';
import { SessionRepo } from './sessions';
import { SettingRepo } from './settings';
import { UserRepo } from './users';

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
