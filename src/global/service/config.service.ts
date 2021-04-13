import { Injectable } from '@nestjs/common'

type Environment = 'development' | 'staging' | 'production'

interface EnvConfigInterface {
  awsRegion: string
  awsAccessKey: string
  awsAccessSecret: string
  awsAccountId: string
  environment: Environment
}

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfigInterface

  constructor() {
    this.envConfig = {
      awsRegion: process.env.AWS_REGION as string,
      awsAccessKey: process.env.AWS_ACCESS_KEY as string,
      awsAccessSecret: process.env.AWS_ACCESS_SECRET as string,
      awsAccountId: process.env.AWS_ACCOUNT_ID as string,
      environment: process.env.NODE_ENV as Environment,
    }
  }

  public get(key: keyof EnvConfigInterface): string {
    return this.envConfig[key]
  }
}
