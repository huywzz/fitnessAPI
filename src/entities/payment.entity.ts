import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { User } from './user.entity';
import { RepsPackage } from './reps-package.entity';

@Entity('payments')
export class Payment extends BaseEntity {
  @Column({
    type: 'int',
  })
  amount: number;

  @Column({
    type: 'float',
  })
  totalCost: number;

  @ManyToOne(() => User, (user) => user.payments)
  user: User;

  @ManyToOne(() => RepsPackage, (repsPackage) => repsPackage.payments)
  repsPackage: RepsPackage;
}
