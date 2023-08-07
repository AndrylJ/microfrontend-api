import { UserUUID } from './UserId'

export class User {
  constructor(
    private readonly uuid: UserUUID,
    private name: string,
    private lastName: string,
    private email: string,
    private birthdate: Date,
  ){}
  
  public getUUID() {
    return this.uuid
  }
  public getName() {
    return this.name
  }
  public getLastName() {
    return this.lastName
  }
  public getEmail() {
    return this.email
  }
  public getBirthdate() {
    return this.birthdate
  }
  public getFullName() {
    return `${this.lastName}, ${this.name}`
  }

  public setName(name: string) {
    return this.name = name
  }
  public setLastName(lastName: string) {
    return this.lastName = lastName
  }
  public setEmail(email: string) {
    return this.email = email
  }
  public setBirthdate(birthdate: Date) {
    return this.birthdate = birthdate
  }
}
