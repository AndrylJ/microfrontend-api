import { STAGE } from '@shared/utils/constants/environments'
import { Stage } from '@shared/utils/enums/project'
import {
  APIGatewayProxyHandlerV2, APIGatewayProxyStructuredResultV2
} from 'aws-lambda'

import { HttpStatusCode } from '../models/HttpStatusCode'

export abstract class LambdaHandler<T = APIGatewayProxyStructuredResultV2> {

  public abstract handler: APIGatewayProxyHandlerV2<T>;

  protected defaultStructure(data: object, meta?: object) {
    return {
      data,
      meta,
    }
  }

  protected defaultResponse(
    code: HttpStatusCode = HttpStatusCode.NO_CONTENT,
    body?: string | object
  ): APIGatewayProxyStructuredResultV2 {
    return {
      statusCode: code,
      headers: { 'Content-Type': 'application/json' },
      body: body
        ? JSON.stringify(body)
        : undefined,
    }
  }

  protected successReponse = (data?: string | object, meta?: object) => {
    return this.defaultResponse(HttpStatusCode.OK, typeof data === 'object' ? this.defaultStructure(data, meta) : data)
  }

  protected errorResponse = (error: Error): APIGatewayProxyStructuredResultV2 => {
    return this.defaultResponse(HttpStatusCode.OK, {
      error: error.name,
      message: error.message,
      ...(STAGE == Stage.DEV && { trace: error.stack?.split('\n') ?? [] }),
    })
  }
}
