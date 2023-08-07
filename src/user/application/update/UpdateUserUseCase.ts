import { User } from '@user/domain/models/User'
import { UserUUID } from '@user/domain/models/UserId'
import { UserRepository } from '@user/domain/repositories/UserRepository'

import { UpdateUserQuery } from './UpdateUserQuery'

export class UpdateUserUseCase {
  constructor(private readonly repo: UserRepository){}
      
  public async handle(params: UpdateUserQuery): Promise<User> {
    const user = await this.repo.get(new UserUUID(params.uuid))

    params.name && user.setName(params.name)
    params.lastName && user.setLastName(params.lastName)
    params.email && user.setEmail(params.email)
    params.birthdate && user.setBirthdate(new Date(params.birthdate))

    return this.repo.update(user)
  }
}
  
