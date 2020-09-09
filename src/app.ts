import {
  INestApplication,
  NestApplicationOptions,
  ValidationPipe,
} from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { ExpressAdapter } from '@nestjs/platform-express'
import express from 'express'
import helmet from 'helmet'
import { urlencoded, json } from 'body-parser'

import { AppModule } from './app.module'

export async function createApp(): Promise<INestApplication> {
  const expressServer = express()
  const httpAdapter = new ExpressAdapter(expressServer)

  const options: NestApplicationOptions = { logger: true, cors: true }
  const app: INestApplication = await NestFactory.create(
    AppModule,
    httpAdapter,
    options,
  )

  const bodySizeLimit = '10mb'

  app.use(json({ limit: bodySizeLimit }))
  app.use(urlencoded({ limit: bodySizeLimit, extended: true }))
  app.use(helmet())
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      dismissDefaultMessages: false,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      validationError: {
        target: true,
        value: true,
      },
    }),
  )

  return app
}
