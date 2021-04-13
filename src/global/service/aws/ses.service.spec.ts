import { Test, TestingModule } from '@nestjs/testing'
import { SesService } from './ses.service'

import { ConfigService } from '../config.service'

describe('SesService', () => {
  let service: SesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SesService,
        { provide: ConfigService, useValue: { get: jest.fn() } },
      ],
    }).compile()

    service = module.get<SesService>(SesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
