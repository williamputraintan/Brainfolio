import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { HealthCheckController } from './healthcheck.controller';

@Module({
	imports: [AuthModule],
	controllers: [HealthCheckController]
})
export class HealthcheckModule {}
