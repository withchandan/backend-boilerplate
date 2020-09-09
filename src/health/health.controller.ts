import { Controller, Get } from '@nestjs/common'

@Controller('')
export class HealthController {
  @Get('version')
  async getVersion() {
    return { name: 'boilerplate', version: '0.0.1' }
  }
}
