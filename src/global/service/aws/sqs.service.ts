import { Injectable } from '@nestjs/common'

import { SQS } from 'aws-sdk'
import { ClientConfiguration } from 'aws-sdk/clients/sqs'

@Injectable()
export class SqsService {
  private readonly client: SQS

  private readonly sqsConfig: ClientConfiguration

  constructor() {
    this.sqsConfig = { region: '' }
    this.client = new SQS(this.sqsConfig)

    console.log(this.client)
  }
}
