import { InvalidArgumentError } from '@shared/domain/errors/InvalidArgumentError'
import { LambdaHandler } from '@shared/infraestructure/lambda/handlers/LambdaHandler'
import { CreateUserQuery } from '@user/application/create/CreateUserQuery'
import { CreateUserUseCase } from '@user/application/create/CreateUserUseCase'
import {
  APIGatewayProxyHandlerV2,
  APIGatewayProxyStructuredResultV2,
} from 'aws-lambda'

import { UserResource } from '../resources/UserResource'

export class CreateUserHandler extends LambdaHandler {
  constructor(private useCase: CreateUserUseCase){
    super()
  }

  public handler: APIGatewayProxyHandlerV2<APIGatewayProxyStructuredResultV2> = async (event) => {
    if (!event.body) throw new InvalidArgumentError('Body is required')
    const body = JSON.parse(event.body) as CreateUserQuery
    if (!body.name || !body.lastName || !body.email|| !body.birthdate) throw new InvalidArgumentError('Params required')
    const data = await this.useCase.handle(body)
    return this.successReponse(UserResource.make(data))
  }
}
