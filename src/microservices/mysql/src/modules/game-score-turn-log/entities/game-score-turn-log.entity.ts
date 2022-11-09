import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('game_score_turn_log')
export class GameScoreTurnLog {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;

  @Column('int', { name: 'remaining_turn' })
  remainingTurn: number;

  @Column('int', { name: 'total_score' })
  totalScore: number;

  @Column('varchar', { name: 'jobseeker_id', length: 255 })
  jobseekerId: string;

  @Column('varchar', { name: 'user_id', nullable: true, length: 50 })
  userId: string | null;
}
