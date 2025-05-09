export interface DataService<T, D> {
  getAll(args?: Record<string, unknown>): Promise<T[] | undefined>;

  getOne(args: Record<string, unknown>): Promise<T | undefined | null>;

  addOne(data: D): Promise<T | undefined>;

  updateOne(id: string, data: Partial<D>): Promise<T | undefined | null>;

  deleteOne(id: string): Promise<T | undefined | null>;
}
