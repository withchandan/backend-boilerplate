import { Test, TestingModule } from '@nestjs/testing'
import { SqsService } from './sqs.service'

import { ConfigService } from '../config.service'

describe('SqsService', () => {
  let service: SqsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SqsService,
        { provide: ConfigService, useValue: { get: jest.fn() } },
      ],
    }).compile()

    service = module.get<SqsService>(SqsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
