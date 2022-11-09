import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('game_lucky_spin_match')
export class GameLuckySpinMatch {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;

  @Column('varchar', { name: 'jobseeker_id', nullable: true, length: 255 })
  jobseekerId: string | null;

  @Column('int', { name: 'lucky_spin_id', nullable: true })
  luckySpinId: number | null;
}
