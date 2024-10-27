export interface IBaseRepository<T> {
  findOne(id: number): Promise<T | undefined>;
  findAll(): Promise<T[]>;
  create(entity: T): Promise<T>;
  save(entity: T): Promise<T>;
  delete(id: number): Promise<void>;
}
