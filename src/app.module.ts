import { Module } from '@nestjs/common';
import { ControllerModule } from './account/users/users.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ControllerModule,
    ThrottlerModule.forRoot([{
      name: 'short',
      ttl: 60,
      limit: 10
    }])
  ],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: ThrottlerModule
  }]
})
export class AppModule {}
