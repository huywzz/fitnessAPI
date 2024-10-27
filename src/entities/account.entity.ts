import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { TypeAccount } from './enums/typeAccount.enum';
import { User } from './user.entity';

@Entity('accounts')
export class Account extends BaseEntity {
  @Column({
    type: 'varchar',
  })
  password: string;

  @Column({
    type: 'varchar',
  })
  oldPassword: string;

  @Column({
    type: 'enum',
    enum: TypeAccount,
    default: TypeAccount.NORMAL,
  })
  type: TypeAccount;

  @OneToOne(() => User, (user) => user.account)
  user: User;
}
