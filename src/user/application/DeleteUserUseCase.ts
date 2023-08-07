import { User } from '@user/domain/models/User'
import { UserUUID } from '@user/domain/models/UserId'
import { UserRepository } from '@user/domain/repositories/UserRepository'

export class DeleteUserUseCase {
  constructor(private readonly repo: UserRepository){}
        
  public async handle(uuid: string): Promise<User> {
    return await this.repo.delete(new UserUUID(uuid))
  }
}
