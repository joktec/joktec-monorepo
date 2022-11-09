import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity('game_turn_log')
export class GameTurnLog {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;

  @Column('int', { name: 'turn' })
  turn: number;

  @Column('tinyint', { name: 'is_read', width: 1 })
  isRead: boolean;

  @Column('tinyint', { name: 'is_visible', width: 1 })
  isVisible: boolean;

  @Column('tinyint', { name: 'is_claimed', width: 1 })
  isClaimed: boolean;

  @Column('varchar', { name: 'action', length: 100 })
  action: string;

  @Column('varchar', { name: 'jobseeker_id', length: 255 })
  jobseekerId: string;

  @Column('int', { name: 'quiz_match_id', nullable: true })
  quizMatchId: number | null;

  @Column('longtext', { name: 'meta_data', nullable: true })
  metaData: string | null;
}
