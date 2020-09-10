import { Controller, Get, HttpStatus } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { ApiCombineDecorators } from '../shared'

@ApiTags('Health')
@Controller('')
export class HealthController {
  @ApiCombineDecorators({
    apiSummary: 'Get application name and version',
    apiDescription: 'fasfasfasdfasdf',
    successStatus: HttpStatus.OK,
    successDescription: 'Return  application name and version',
  })
  @Get('version')
  async getVersion() {
    return { name: 'boilerplate', version: '0.0.1' }
  }
}
