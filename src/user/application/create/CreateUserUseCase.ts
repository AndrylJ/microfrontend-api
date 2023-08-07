import { User } from '@user/domain/models/User'
import { UserUUID } from '@user/domain/models/UserId'
import { UserRepository } from '@user/domain/repositories/UserRepository'
import { v4 as uuidV4 } from 'uuid'

import { CreateUserQuery } from './CreateUserQuery'

export class CreateUserUseCase {
  constructor(private readonly repo: UserRepository){}
    
  public async handle(params: CreateUserQuery): Promise<User> {
    const uuid = new UserUUID(uuidV4())
    const user = new User(
      uuid,
      params.name,
      params.lastName,
      params.email,
      new Date(params.birthdate)
    )

    return this.repo.create(user)
  }
}
