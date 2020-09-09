import { Server } from 'http'

import { INestApplication } from '@nestjs/common'
import { Context, Handler, APIGatewayProxyEvent } from 'aws-lambda'
import { createServer, proxy } from 'aws-serverless-express'
import { eventContext } from 'aws-serverless-express/middleware'

import { createApp } from './app'

// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this
// is likely due to a compressed response (e.g. gzip) which has not
// been handled correctly by aws-serverless-express and/or API
// Gateway. Add the necessary MIME types to binaryMimeTypes below
const binaryMimeTypes: string[] = []

let cachedServer: Server

// Create the Nest.js server and convert it into an Express.js server
async function bootstrapServer(): Promise<Server> {
  if (!cachedServer) {
    const app: INestApplication = await createApp()

    app.use(eventContext())
    await app.init()

    cachedServer = createServer(
      app.getHttpAdapter().getInstance(),
      undefined,
      binaryMimeTypes,
    )
  }

  return cachedServer
}

export const handler: Handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
) => {
  cachedServer = await bootstrapServer()

  return proxy(cachedServer, event, context, 'PROMISE').promise
}
