import { InvalidArgumentError } from '@shared/domain/errors/InvalidArgumentError'
import { LambdaHandler } from '@shared/infraestructure/lambda/handlers/LambdaHandler'
import { UpdateUserQuery } from '@user/application/update/UpdateUserQuery'
import { UpdateUserUseCase } from '@user/application/update/UpdateUserUseCase'
import {
  APIGatewayProxyHandlerV2,
  APIGatewayProxyStructuredResultV2,
} from 'aws-lambda'

import { UserResource } from '../resources/UserResource'

export class UpdateUserHandler extends LambdaHandler {
  constructor(private useCase: UpdateUserUseCase){
    super()
  }

  public handler: APIGatewayProxyHandlerV2<APIGatewayProxyStructuredResultV2> = async (event) => {
    const uuid = event.pathParameters?.uuid
    if (!uuid) throw new InvalidArgumentError('UUID is required')
    if (!event.body) throw new InvalidArgumentError('Body is required')

    const body = JSON.parse(event.body) as Omit<UpdateUserQuery, 'uuid'>

    const data = await this.useCase.handle({
      uuid,
      ...body
    })

    return this.successReponse(UserResource.make(data))
  }
}
