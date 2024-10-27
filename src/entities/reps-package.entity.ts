import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { Payment } from './payment.entity';

@Entity('reps-packages')
export class RepsPackage extends BaseEntity {
  @Column({
    type: 'varchar',
  })
  numberOfREPs: string;

  @Column({
    type: 'float',
  })
  price: number;

  @Column({
    type: 'float',
  })
  discount: number;

  @OneToMany(() => Payment, (payment) => payment.repsPackage)
  payments: Payment[];
}
