export interface IBaseController<T> {
  findOne(id: number): Promise<T | undefined>;
  findAll(): Promise<T[]>;
  create(entity: T): Promise<T>;
  update(entity: T): Promise<T>;
  delete(id: number): Promise<void>;
}
