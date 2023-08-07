import { User as PrismaUser } from '@prisma/client'
import { User } from '@user/domain/models/User'
import { UserUUID } from '@user/domain/models/UserId'

export class UserParser {
  public static parse(user: PrismaUser): User {
    const uuid = new UserUUID(user.uuid)
    return new User(
      uuid,
      user.name,
      user.lastName,
      user.email,
      user.birthdate
    )
  }
}
