import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('quiz_log_question_answered')
export class QuizLogQuestionAnswered {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;

  @Column('varchar', { name: 'answers', length: 255 })
  answers: string;

  @Column('varchar', { name: 'correct_answers', length: 255 })
  correctAnswers: string;

  @Column('tinyint', { name: 'is_correct', width: 1 })
  isCorrect: boolean;

  @Column('int', { name: 'score' })
  score: number;

  @Column('int', { name: 'question_id' })
  questionId: number;

  @Column('int', { name: 'quiz_match_id' })
  quizMatchId: number;

  @Column('tinyint', { name: 'used_hint', width: 1 })
  usedHint: boolean;

  @Column('longtext', { name: 'meta_data', nullable: true })
  metaData: string | null;
}
