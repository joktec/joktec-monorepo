import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('quiz_action_log')
export class QuizActionLog {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;

  @Column('varchar', { name: 'action', length: 100 })
  action: string;

  @Column('varchar', { name: 'jobseeker_id', length: 255 })
  jobseekerId: string;

  @Column('int', { name: 'quiz_id', nullable: true })
  quizId: number | null;

  @Column('tinyint', { name: 'is_claimed_checkin', width: 1 })
  isClaimedCheckin: boolean;
}
