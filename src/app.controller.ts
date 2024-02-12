import { Controller, Get } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('health check')
@Controller()
export class AppController {
  constructor() {}

  @Get('health')
  @HealthCheck()
  async check(): Promise<any> {
    return {
      status: 'all is healthy',
    };
  }
}
