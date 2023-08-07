import { APIGatewayProxyHandlerV2 } from 'aws-lambda'

import { LambdaHandler } from '../handlers/LambdaHandler'
import { HttpStatusCode } from '../models/HttpStatusCode'

export class ErrorMiddleware extends LambdaHandler {
  private nextHandler: LambdaHandler

  constructor(nextHandler: LambdaHandler) {
    super()
    this.nextHandler = nextHandler
  }

  public handler: APIGatewayProxyHandlerV2 = async (event, ctx, callback) => {
    try {
      const response = await this.nextHandler.handler(event, ctx, callback)
      if (response) {
        return response
      }
      return this.defaultResponse(HttpStatusCode.NO_CONTENT)
    } catch (error) {
      return this.errorResponse(error as Error)
    }
  }
}
