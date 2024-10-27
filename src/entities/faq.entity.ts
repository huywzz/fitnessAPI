import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base/base.entity';

@Entity('faqs')
export class FAQs extends BaseEntity {
  @Column({
    type: 'varchar',
  })
  question: string;

  @Column({
    type: 'varchar',
  })
  answer: string;

  @Column({
    type: 'boolean',
  })
  isActive: boolean;
}
