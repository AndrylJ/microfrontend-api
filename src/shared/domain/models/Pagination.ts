import { InvalidArgumentError } from '@shared/domain/errors/InvalidArgumentError'

export class Pagination {
  constructor(
    private readonly page: number,
    private readonly perPage: number,
    private readonly total: number,
  ) {
    this.ensureIsValidPaginationValue(page)
    this.ensureIsValidPaginationValue(perPage)
    this.ensureIsValidTotal(total)
  }

  private ensureIsValidPaginationValue(value?: unknown) {
    if (typeof value !== 'number' || isNaN(value) || value < 1) {
      throw new InvalidArgumentError('The pagination value is invalid')
    }
  }
  
  private ensureIsValidTotal(value?: unknown) {
    if (typeof value !== 'number' || isNaN(value) || value < 0) {
      throw new InvalidArgumentError('Total value is invalid')
    }
  }
  
  public getPage(): number {
    return this.page
  }

  public getPerPage(): number {
    return this.perPage
  }

  public getTotal(): number {
    return this.total
  }
}
