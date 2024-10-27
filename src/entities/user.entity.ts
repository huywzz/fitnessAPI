import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { Gender } from './enums/gender.enum';
import { Comment } from './comment.entity';
import { RefreshToken } from './refresh-token.entity';
import { Account } from './account.entity';
import { Channel } from './channel.entity';
import { Payment } from './payment.entity';
import { SearchHistory } from './search-history.entity';
import { Donation } from './donation.entity';
import { Follow } from './follow.entity';
import { WatchingVideoHistory } from './watching-video-history.entity';
import { Role } from './enums/role.enum';

@Entity('users')
export class User extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  username: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  dateOfBirth: Date;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.MALE,
  })
  gender: Gender;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.VIEWER,
  })
  role: Role;

  @Column({
    type: 'boolean',
    default: false,
  })
  isActive: boolean;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  fullName: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  country: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  state: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  city: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  stripeId: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  deviceToken: string;

  @OneToOne(() => Account, (account) => account.user)
  account: Account;

  @OneToOne(() => Channel, (channel) => channel.user)
  channel: Channel;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];

  @OneToMany(() => SearchHistory, (searchHistory) => searchHistory.user)
  searchHistorys: SearchHistory[];

  @OneToMany(() => Donation, (donation) => donation.user)
  donations: Donation[];

  @OneToMany(() => Follow, (follow) => follow.user)
  follows: Follow[];

  @OneToMany(() => WatchingVideoHistory, (watchingVideoHistory) => watchingVideoHistory.user)
  watchingVideoHistorys: WatchingVideoHistory[];
}
