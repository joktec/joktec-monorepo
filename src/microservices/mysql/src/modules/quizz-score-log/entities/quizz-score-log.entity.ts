import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('quiz_score_log')
export class QuizScoreLog {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;

  @Column('int', { name: 'score' })
  score: number;

  @Column('varchar', { name: 'score_type', length: 50 })
  scoreType: string;

  @Column('varchar', { name: 'jobseeker_id', length: 255 })
  jobseekerId: string;

  @Column('int', { name: 'quiz_match_id', nullable: true })
  quizMatchId: number | null;
}
