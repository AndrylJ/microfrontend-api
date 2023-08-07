import { Pagination } from './Pagination'

export class List<T> {
  constructor(
    public data: T[],
    public pagination?: Pagination
  ) {}
}
