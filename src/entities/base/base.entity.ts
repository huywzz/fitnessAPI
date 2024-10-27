import { CreateDateColumn, DeleteDateColumn, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'id',
  })
  @Index()
  public id: number;

  @UpdateDateColumn()
  public updatedAt: Date;

  @CreateDateColumn()
  public createdAt: Date;

  @DeleteDateColumn()
  public deletedAt: Date;
}
