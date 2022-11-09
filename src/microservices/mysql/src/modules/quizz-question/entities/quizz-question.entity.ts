import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('quiz_question')
export class QuizQuestion {
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

  @Column('longtext', { name: 'question' })
  question: string;

  @Column('longtext', { name: 'question_vi', nullable: true })
  questionVi: string | null;

  @Column('longtext', { name: 'hint', nullable: true })
  hint: string | null;

  @Column('longtext', { name: 'hint_vi', nullable: true })
  hintVi: string | null;

  @Column('longtext', { name: 'explanation', nullable: true })
  explanation: string | null;

  @Column('longtext', { name: 'explanation_vi', nullable: true })
  explanationVi: string | null;

  @Column('int', { name: 'score' })
  score: number;

  @Column('tinyint', { name: 'is_multi_answer', width: 1 })
  isMultiAnswer: boolean;

  @Column('int', { name: 'quiz_id', nullable: true })
  quizId: number | null;

  @Column('tinyint', { name: 'is_freetext_answer', width: 1 })
  isFreetextAnswer: boolean;

  @Column('tinyint', { name: 'is_freetext', nullable: true, width: 1 })
  isFreetext: boolean | null;

  @Column('int', { name: 'clone_from_id', nullable: true })
  cloneFromId: number | null;

  @Column('longtext', { name: 'description', nullable: true })
  description: string | null;
}
