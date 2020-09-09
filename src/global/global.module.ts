import { Module, Global } from '@nestjs/common'

import { DynamodbService, SqsService, S3Service, SesService } from './service'

@Global()
@Module({
  providers: [DynamodbService, SqsService, S3Service, SesService],
})
export class GlobalModule {}
