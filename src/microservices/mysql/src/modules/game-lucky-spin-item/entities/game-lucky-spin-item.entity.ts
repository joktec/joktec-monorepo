import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('game_lucky_spin_item')
export class GameLuckySpinItem {
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

  @Column('varchar', { name: 'item_type', length: 100 })
  itemType: string;

  @Column('int', { name: 'quantity', nullable: true })
  quantity: number | null;

  @Column('int', { name: 'amount', nullable: true })
  amount: number | null;

  @Column('double', { name: 'ratio', nullable: true })
  ratio: number | null;

  @Column('longtext', { name: 'item_description', nullable: true })
  itemDescription: string | null;

  @Column('varchar', { name: 'item_data', length: 255 })
  itemData: string;

  @Column('varchar', { name: 'item_image', length: 255 })
  itemImage: string;

  @Column('int', { name: 'lucky_spin_id', nullable: true })
  luckySpinId: number | null;

  @Column('int', { name: 'number_of_pieces', nullable: true })
  numberOfPieces: number | null;
}
