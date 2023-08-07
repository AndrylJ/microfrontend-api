import { List } from '@shared/domain/models/List'
import { ListParams } from '@shared/domain/repositories/ListParams'

import { User } from '../models/User'
import { UserUUID } from '../models/UserId'

export interface UserListParams extends ListParams {
    search?: string;
}

export interface UserRepository {
    list: (params?: UserListParams) => Promise<List<User>>;
    get: (userUUID: UserUUID) => Promise<User>;
    create: (user: User) => Promise<User>;
    update: (user: User) => Promise<User>;
    delete: (userUUID: UserUUID) => Promise<User>;
}
