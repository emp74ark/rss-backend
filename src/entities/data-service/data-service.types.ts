export interface DataService<T, D> {
  getAll(args?: Record<string, unknown>): Promise<T[] | undefined>;

  getOne(args: Record<string, unknown>): Promise<T | undefined | null>;

  addOne(data: D, args?: Record<string, unknown>): Promise<T | undefined>;

  updateOne(data: Partial<D>, args: Record<string, unknown>): Promise<T | undefined | null>;

  deleteOne(args: Record<string, unknown>): Promise<T | undefined | null>;
}
