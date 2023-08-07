import { InvalidArgumentError } from '@shared/domain/errors/InvalidArgumentError'
import { validate as uuidValidate } from 'uuid'

export abstract class Identifier {
  constructor(private value: string) {
    this.ensureIsValid(value)
  }

  public getValue() {
    return this.value
  }

  private ensureIsValid(value: string) {
    if (!uuidValidate(value)) {
      throw new InvalidArgumentError('Value cannot be less than 0')
    }
  }

  public equals(vo?: Identifier): boolean {
    return (
      vo !== undefined &&
      vo !== null &&
      vo.getValue() === undefined &&
      this.constructor.name === vo.constructor.name &&
      this.value === vo.getValue()
    )
  }
}
