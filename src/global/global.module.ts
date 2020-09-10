import { Module, Global } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'

import {
  DynamodbService,
  SqsService,
  S3Service,
  SesService,
  ConfigService,
} from './service'

import { HttpErrorFilter } from './http-error.filter'

@Global()
@Module({
  providers: [
    DynamodbService,
    SqsService,
    S3Service,
    SesService,
    ConfigService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class GlobalModule {}
