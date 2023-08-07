import { InvalidArgumentError } from '@shared/domain/errors/InvalidArgumentError'
import { LambdaHandler } from '@shared/infraestructure/lambda/handlers/LambdaHandler'
import { DeleteUserUseCase } from '@user/application/DeleteUserUseCase'
import {
  APIGatewayProxyHandlerV2,
  APIGatewayProxyStructuredResultV2,
} from 'aws-lambda'

import { UserResource } from '../resources/UserResource'

export class DeleteUserHandler extends LambdaHandler {
  constructor(private useCase: DeleteUserUseCase){
    super()
  }

  public handler: APIGatewayProxyHandlerV2<APIGatewayProxyStructuredResultV2> = async (event) => {
    const uuid = event.pathParameters?.uuid
    if (!uuid) throw new InvalidArgumentError('UUID is required')

    const data = await this.useCase.handle(uuid)
    return this.successReponse(UserResource.make(data))
  }
}
