import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('game_lucky_spin')
export class GameLuckySpin {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;

  @Column('varchar', { name: 'created_by', nullable: true, length: 255 })
  createdBy: string | null;

  @Column('varchar', { name: 'updated_by', nullable: true, length: 255 })
  updatedBy: string | null;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('datetime', { name: 'show_banner_from' })
  showBannerFrom: Date;

  @Column('datetime', { name: 'show_banner_to' })
  showBannerTo: Date;

  @Column('datetime', { name: 'start_at' })
  startAt: Date;

  @Column('datetime', { name: 'end_at' })
  endAt: Date;

  @Column('tinyint', { name: 'add_additional_turn', nullable: true })
  addAdditionalTurn: number | null;

  @Column('int', { name: 'amount_of_pieces', nullable: true })
  amountOfPieces: number | null;

  @Column('tinyint', { name: 'is_active', nullable: true, width: 1 })
  isActive: boolean | null;

  @Column('int', { name: 'maximum_turn_per_user', nullable: true })
  maximumTurnPerUser: number | null;

  @Column('varchar', { name: 'run_of_turn_message', length: 255 })
  runOfTurnMessage: string;

  @Column('longtext', { name: 'whitelist_to_win', nullable: true })
  whitelistToWin: string | null;
}
