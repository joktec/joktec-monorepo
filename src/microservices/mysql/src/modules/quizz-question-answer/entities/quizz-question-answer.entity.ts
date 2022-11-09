import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('quiz_question_answer')
export class QuizQuestionAnswer {
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

  @Column('varchar', { name: 'answer', length: 255 })
  answer: string;

  @Column('varchar', { name: 'answer_vi', nullable: true, length: 255 })
  answerVi: string | null;

  @Column('tinyint', { name: 'is_correct_answer', width: 1 })
  isCorrectAnswer: boolean;

  @Column('int', { name: 'question_id', nullable: true })
  questionId: number | null;
}
