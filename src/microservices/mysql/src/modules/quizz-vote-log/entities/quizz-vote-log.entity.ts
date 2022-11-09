import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('quiz_vote_log')
export class QuizVoteLog {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;

  @Column('varchar', { name: 'vote_status', length: 100 })
  voteStatus: string;

  @Column('varchar', { name: 'jobseeker_id', length: 255 })
  jobseekerId: string;

  @Column('int', { name: 'quiz_id' })
  quizId: number;

  @Column('longtext', { name: 'reason', nullable: true })
  reason: string | null;
}
