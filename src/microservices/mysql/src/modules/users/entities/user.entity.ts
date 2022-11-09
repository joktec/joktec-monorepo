import { Column, Entity } from 'typeorm';

@Entity('users')
export class Users {
  @Column('varchar', { primary: true, name: 'user_id', length: 255 })
  userId: string;

  @Column('int', { name: 'active', nullable: true, default: () => "'0'" })
  active: number | null;

  @Column('varchar', { name: 'address', nullable: true, length: 255 })
  address: string | null;

  @Column('varchar', { name: 'avatar', nullable: true, length: 255 })
  avatar: string | null;

  @Column('datetime', { name: 'birthday', nullable: true })
  birthday: Date | null;

  @Column('varchar', { name: 'create_by', nullable: true, length: 255 })
  createBy: string | null;

  @Column('timestamp', {
    name: 'create_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createDate: Date;

  @Column('varchar', { name: 'cv_choose', nullable: true, length: 255 })
  cvChoose: string | null;

  @Column('int', { name: 'deleted', nullable: true, default: () => "'0'" })
  deleted: number | null;

  @Column('longtext', { name: 'detail', nullable: true })
  detail: string | null;

  @Column('varchar', { name: 'email', nullable: true, length: 255 })
  email: string | null;

  @Column('varchar', { name: 'experience', nullable: true, length: 255 })
  experience: string | null;

  @Column('varchar', { name: 'first_name', nullable: true, length: 255 })
  firstName: string | null;

  @Column('varchar', { name: 'full_name', nullable: true, length: 255 })
  fullName: string | null;

  @Column('int', { name: 'gender', nullable: true })
  gender: number | null;

  @Column('datetime', { name: 'last_login', nullable: true })
  lastLogin: Date | null;

  @Column('varchar', { name: 'last_name', nullable: true, length: 255 })
  lastName: string | null;

  @Column('timestamp', {
    name: 'last_update',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastUpdate: Date | null;

  @Column('int', { name: 'locked', nullable: true, default: () => "'0'" })
  locked: number | null;

  @Column('varchar', { name: 'password', nullable: true, length: 255 })
  password: string | null;

  @Column('varchar', { name: 'phone_number', nullable: true, length: 255 })
  phoneNumber: string | null;

  @Column('varchar', { name: 'position', nullable: true, length: 255 })
  position: string | null;

  @Column('varchar', { name: 'status', nullable: true, length: 255 })
  status: string | null;

  @Column('varchar', { name: 'title', nullable: true, length: 255 })
  title: string | null;

  @Column('varchar', { name: 'update_by', nullable: true, length: 255 })
  updateBy: string | null;

  @Column('varchar', {
    name: 'username',
    nullable: true,
    length: 255,
  })
  username: string | null;

  @Column('datetime', { name: 'expire_reset_pass', nullable: true })
  expireResetPass: Date | null;

  @Column('varchar', { name: 'token_reset_pass', nullable: true, length: 255 })
  tokenResetPass: string | null;

  @Column('varchar', { name: 'social_link', nullable: true, length: 255 })
  socialLink: string | null;

  @Column('bit', { name: 'is_auto_created', nullable: true })
  isAutoCreated: boolean | null;

  @Column('varchar', { name: 'legacy_password', nullable: true, length: 255 })
  legacyPassword: string | null;

  @Column('int', {
    name: 'member_role_id',
    nullable: true,
    default: () => "'0'",
  })
  memberRoleId: number | null;

  @Column('tinyint', {
    name: 'platform',
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  platform: boolean | null;

  @Column('varchar', { name: 'fb_id', nullable: true, length: 50 })
  fbId: string | null;

  @Column('varchar', { name: 'vne_id', nullable: true, length: 50 })
  vneId: string | null;

  @Column('tinyint', {
    name: 'unlock_confirm_shown',
    nullable: true,
    width: 1,
    default: () => "'1'",
  })
  unlockConfirmShown: boolean | null;

  @Column('varchar', {
    name: 'email_verification',
    nullable: true,
    length: 20,
    default: () => "'UNVERIFIED'",
  })
  emailVerification: string | null;

  @Column('varchar', {
    name: 'locked_reason_code',
    nullable: true,
    length: 255,
  })
  lockedReasonCode: string | null;

  @Column('tinyint', {
    name: 'synced_platform',
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  syncedPlatform: boolean | null;
}
