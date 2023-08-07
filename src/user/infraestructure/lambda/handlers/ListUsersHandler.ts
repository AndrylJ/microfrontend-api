import { LambdaHandler } from '@shared/infraestructure/lambda/handlers/LambdaHandler'
import { ListUsersUseCase } from '@user/application/ListUsersUseCase'
import {
  APIGatewayProxyHandlerV2,
  APIGatewayProxyStructuredResultV2,
} from 'aws-lambda'

import { UserResource } from '../resources/UserResource'

export class ListUsersHandler extends LambdaHandler {
  constructor(private listUseCase: ListUsersUseCase){
    super()
  }

  public handler: APIGatewayProxyHandlerV2<APIGatewayProxyStructuredResultV2> = async () => {
    const data = await this.listUseCase.handle()
    return this.successReponse(UserResource.collection(data.data), data.pagination)
  }
}
