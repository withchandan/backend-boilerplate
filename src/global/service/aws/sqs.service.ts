import { Injectable } from '@nestjs/common'

import { SQS } from 'aws-sdk'
import { ClientConfiguration } from 'aws-sdk/clients/sqs'

import {
  PushMessageBatchReqInterface,
  PushMessageReqInterface,
  PushMessageResInterface,
  PushMessageBatchResInterface,
} from './interface'

import { ConfigService } from '../config.service'

@Injectable()
export class SqsService {
  private readonly client: SQS

  private readonly sqsConfig: ClientConfiguration

  constructor(private readonly config: ConfigService) {
    this.sqsConfig = {
      region: this.config.get('awsRegion'),
      apiVersion: '2012-11-05',
      credentials: {
        accessKeyId: this.config.get('awsAccessKey'),
        secretAccessKey: this.config.get('awsAccessSecret'),
      },
    }

    this.client = new SQS(this.sqsConfig)
  }

  public async push(
    params: PushMessageReqInterface,
  ): Promise<PushMessageResInterface>
  public async push(
    params: PushMessageBatchReqInterface,
  ): Promise<PushMessageBatchResInterface>
  public async push(
    params: PushMessageReqInterface | PushMessageBatchReqInterface,
  ): Promise<PushMessageResInterface | PushMessageBatchResInterface> {
    if ((params as PushMessageBatchReqInterface).entries) {
      const {
        Successful,
        Failed,
      } = await this.client.sendMessageBatch().promise()

      return {
        successful: Successful.map((success) => ({
          id: success.Id,
          messageId: success.MessageId,
          mD5OfMessageBody: success.MD5OfMessageBody,
        })),
        failed: Failed.map((failed) => ({
          id: failed.Id,
          message: failed.Message,
        })),
      }
    }

    const res = await this.client.sendMessage().promise()

    return { messageId: res.MessageId, mD5OfMessageBody: res.MD5OfMessageBody }
  }
}
