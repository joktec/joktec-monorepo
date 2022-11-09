import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('quiz_match_log')
export class QuizMatchLog {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;

  @Column('int', { name: 'score' })
  score: number;

  @Column('varchar', { name: 'status', length: 100 })
  status: string;

  @Column('double', { name: 'finished_percent', precision: 22 })
  finishedPercent: number;

  @Column('datetime', { name: 'finished_at', nullable: true })
  finishedAt: Date | null;

  @Column('varchar', { name: 'jobseeker_id', length: 255 })
  jobseekerId: string;

  @Column('int', { name: 'quiz_id' })
  quizId: number;

  @Column('tinyint', { name: 'is_time_out', width: 1 })
  isTimeOut: boolean;

  @Column('varchar', { name: 'question_order', nullable: true, length: 255 })
  questionOrder: string | null;

  @Column('varchar', { name: 'replay_match_id', nullable: true, length: 255 })
  replayMatchId: string | null;

  @Column('int', { name: 'final_score', nullable: true })
  finalScore: number | 0;

  @Column('varchar', { name: 'result_status', nullable: true, length: 255 })
  resultStatus: string | null;
}
