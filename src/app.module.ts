import { Module } from '@nestjs/common'
import { HealthModule } from './health/health.module';
import { GlobalModule } from './global/global.module';
import { SharedModule } from './shared/shared.module';

@Module({ imports: [HealthModule, GlobalModule, SharedModule] })
export class AppModule {}
