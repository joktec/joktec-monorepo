import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('game_lucky_spin_history')
export class GameLuckySpinHistory {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;

  @Column('int', { name: 'amount', nullable: true })
  amount: number | null;

  @Column('longtext', { name: 'item_meta_data', nullable: true })
  itemMetaData: string | null;

  @Column('int', { name: 'lucky_spin_item_id', nullable: true })
  luckySpinItemId: number | null;

  @Column('int', { name: 'lucky_spin_match_id', nullable: true })
  luckySpinMatchId: number | null;
}
