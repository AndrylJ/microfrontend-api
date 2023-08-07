import { User } from '@user/domain/models/User'

export class UserResource {
  private static parse(data: User): object {
    return {
      uuid: data.getUUID().getValue(),
      name: data.getName(),
      lastName: data.getLastName(),
      email: data.getEmail(),
      birthdate: data.getBirthdate().toDateString(),
    }
  }

  public static make(data: User) {
    return this.parse(data)
  }

  public static collection(data: User[]) {
    return data.map(item => this.make(item))
  }
}
