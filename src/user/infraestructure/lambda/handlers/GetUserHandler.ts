import { InvalidArgumentError } from '@shared/domain/errors/InvalidArgumentError'
import { LambdaHandler } from '@shared/infraestructure/lambda/handlers/LambdaHandler'
import { GetUserUseCase } from '@user/application/GetUserUseCase'
import {
  APIGatewayProxyHandlerV2,
  APIGatewayProxyStructuredResultV2,
} from 'aws-lambda'

import { UserResource } from '../resources/UserResource'

export class GetUserHandler extends LambdaHandler {
  constructor(private useCase: GetUserUseCase){
    super()
  }

  public handler: APIGatewayProxyHandlerV2<APIGatewayProxyStructuredResultV2> = async (event) => {
    const uuid = event.pathParameters?.uuid
    if (!uuid) throw new InvalidArgumentError('UUID is required')

    const data = await this.useCase.handle(uuid)

    return this.successReponse(UserResource.make(data))
  }
}
