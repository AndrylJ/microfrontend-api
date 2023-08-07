import { PrismaClient } from '@prisma/client'
import { List } from '@shared/domain/models/List'
import { Pagination } from '@shared/domain/models/Pagination'
import { UserParser } from '@shared/infraestructure/prisma/parsers/UserParser'
import { User } from '@user/domain/models/User'
import { UserUUID } from '@user/domain/models/UserId'
import {
  UserListParams, UserRepository
} from '@user/domain/repositories/UserRepository'

export class PrismaUserRepository implements UserRepository {
  constructor(private client: PrismaClient) {}
  
  public async list(params?: UserListParams): Promise<List<User>> {
    const page = params?.pagination?.page
    const perPage = params?.pagination?.perPage
    const skip = page && perPage ? (page - 1 * perPage) : undefined
    const filter = {
      OR: {
        uuid: { contains: params?.search },
        name: { contains: params?.search },
        lastName: { contains: params?.search },
        email: { contains: params?.search },
      }
    }
    const data = await this.client.user.findMany({
      where: params?.search ? filter : undefined,
      skip,
      take: perPage
    })
      
    let pagination: Pagination | undefined = undefined
      
    if (page && perPage) {
      const total = await this.client.user.count({ where: filter })
      pagination = new Pagination(page, perPage, total)
    }
  
    const parsed = data.map(user => UserParser.parse(user))
  
    return new List(parsed, pagination)
  }

  public async get(userUUID: UserUUID): Promise<User> {
    const data = await this.client.user.findUniqueOrThrow({ where: { uuid: userUUID.getValue() } })
    return UserParser.parse(data)
  }

  public async create(user: User): Promise<User> {
    const data = await this.client.user.create({
      data: {
        uuid: user.getUUID().getValue(),
        name: user.getName(),
        email: user.getEmail(),
        lastName: user.getLastName(),
        birthdate: user.getBirthdate(),
      }
    })

    return UserParser.parse(data)
  }

  public async update(user: User): Promise<User> {
    const data = await this.client.user.update({
      where: { uuid: user.getUUID().getValue() },
      data: {
        uuid: user.getUUID().getValue(),
        name: user.getName(),
        email: user.getEmail(),
        lastName: user.getLastName(),
        birthdate: user.getBirthdate(),
      }
    })

    return UserParser.parse(data)
  }

  public async delete(uuid: UserUUID): Promise<User> {
    const data = await this.client.user.delete({ where: { uuid: uuid.getValue() } })
    return UserParser.parse(data)
  }
}
