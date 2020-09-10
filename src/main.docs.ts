import { INestApplication, Logger } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { createApp } from './app'

import { description, name, version } from '../package.json'

async function bootstrap(): Promise<void> {
  const DEFAULT_PORT = parseInt(process.env.PORT || '9090', 10)
  const app: INestApplication = await createApp()

  const options = new DocumentBuilder()
    .addServer(
      `http://${name}.{environment}.postpublisher.co`,
      'Remote Server',
      {
        environment: { default: 'dev', enum: ['dev', 'stage', 'prod'] },
      },
    )
    .addServer(`http://localhost:${DEFAULT_PORT}`, 'Local Server')
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .addApiKey({ type: 'apiKey', in: 'header', name: 'x-api-key' }, 'x-api-key')
    .build()
  const document = SwaggerModule.createDocument(app, options)

  SwaggerModule.setup('api', app, document)

  await app.init()
  await app.listen(DEFAULT_PORT)
  Logger.log(
    `API documentation server started on http://localhost:${DEFAULT_PORT}/api`,
  )
}

bootstrap()
