import { Module, Global } from '@nestjs/common'

import { DynamodbService, SqsService, S3Service, SesService } from './service'
import { ConfigService } from './config.service';

@Global()
@Module({
  providers: [DynamodbService, SqsService, S3Service, SesService, ConfigService],
})
export class GlobalModule {}
