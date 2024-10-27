import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { User } from './user.entity';

@Entity('search-histories')
export class SearchHistory extends BaseEntity {
  @Column({
    type: 'varchar',
  })
  content: string;

  @ManyToOne(() => User, (user) => user.searchHistorys)
  user: User;
}
