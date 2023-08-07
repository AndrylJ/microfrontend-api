import { PrismaClient } from '@prisma/client'
import { CreateUserUseCase } from '@user/application/create/CreateUserUseCase'
import { DeleteUserUseCase } from '@user/application/DeleteUserUseCase'
import { GetUserUseCase } from '@user/application/GetUserUseCase'
import { ListUsersUseCase } from '@user/application/ListUsersUseCase'
import { UpdateUserUseCase } from '@user/application/update/UpdateUserUseCase'
import { CreateUserHandler } from '@user/infraestructure/lambda/handlers/CreateUserHandler'
import { DeleteUserHandler } from '@user/infraestructure/lambda/handlers/DeleteUserHandler'
import { GetUserHandler } from '@user/infraestructure/lambda/handlers/GetUserHandler'
import { ListUsersHandler } from '@user/infraestructure/lambda/handlers/ListUsersHandler'
import { UpdateUserHandler } from '@user/infraestructure/lambda/handlers/UpdateUserHandler'
import { PrismaUserRepository } from '@user/infraestructure/prisma/PrismaUserRepository'

// Repositories
const prismaClient = new PrismaClient()
const userRepository = new PrismaUserRepository(prismaClient)

// Use cases
const getUserUseCase = new GetUserUseCase(userRepository)
const listUsersUseCase = new ListUsersUseCase(userRepository)
const createUserUseCase = new CreateUserUseCase(userRepository)
const updateUserUseCase = new UpdateUserUseCase(userRepository)
const deleteUserUseCase = new DeleteUserUseCase(userRepository)

// Handlers
export const getUserHandler = new GetUserHandler(getUserUseCase).handler
export const listUsersHandler = new ListUsersHandler(listUsersUseCase).handler
export const createUserHandler = new CreateUserHandler(createUserUseCase).handler
export const updateUserHandler = new UpdateUserHandler(updateUserUseCase).handler
export const deleteUserHandler = new DeleteUserHandler(deleteUserUseCase).handler
