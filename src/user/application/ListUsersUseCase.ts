import { List } from '@shared/domain/models/List'
import { User } from '@user/domain/models/User'
import {
  UserListParams, UserRepository
} from '@user/domain/repositories/UserRepository'

export class ListUsersUseCase {
  constructor(private readonly repo: UserRepository){}
  
  public async handle(params?: UserListParams): Promise<List<User>> {
    return this.repo.list(params)
  }
}
