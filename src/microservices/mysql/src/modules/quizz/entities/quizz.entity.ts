import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('quiz')
export class Quiz {
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

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('varchar', { name: 'name_vi', nullable: true, length: 255 })
  nameVi: string | null;

  @Column('longtext', { name: 'description', nullable: true })
  description: string | null;

  @Column('longtext', { name: 'description_vi', nullable: true })
  descriptionVi: string | null;

  @Column('int', { name: 'number_of_visitor', nullable: true })
  numberOfVisitor: number | null;

  @Column('int', { name: 'number_of_player', nullable: true })
  numberOfPlayer: number | null;

  @Column('int', { name: 'number_of_vote', nullable: true })
  numberOfVote: number | null;

  @Column('double', { name: 'upvote_percent', nullable: true, precision: 22 })
  upvotePercent: number | null;

  @Column('varchar', { name: 'logo', nullable: true, length: 255 })
  logo: string | null;

  @Column('varchar', { name: 'banner', nullable: true, length: 255 })
  banner: string | null;

  @Column('int', { name: 'category_id' })
  categoryId: number;

  @Column('varchar', { name: 'organization_id', nullable: true, length: 255 })
  organizationId: string | null;

  @Column('varchar', { name: 'level', length: 50 })
  level: string;

  @Column('tinyint', { name: 'is_active', nullable: true, width: 1 })
  isActive: boolean | null;

  @Column('int', { name: 'duration', nullable: true })
  duration: number | null;

  @Column('varchar', { name: 'type', length: 50 })
  type: string;

  @Column('longtext', { name: 'tags', nullable: true })
  tags: string | null;

  @Column('longtext', { name: 'whitelist', nullable: true })
  whitelist: string | null;

  @Column('varchar', { name: 'mode', nullable: true, length: 20 })
  mode: string | null;

  @Column('int', { name: 'number_of_questions', nullable: true })
  numberOfQuestions: number | null;

  @Column('tinyint', { name: 'is_free_to_play', nullable: true, width: 1 })
  isFreeToPlay: boolean | null;

  @Column('tinyint', { name: 'hide_results', nullable: true, width: 1 })
  hideResults: boolean | null;

  @Column('varchar', { name: 'event_tag', nullable: true, length: 100 })
  eventTag: string | null;

  @Column('int', { name: 'language_id', nullable: true })
  languageId: number | null;
}
