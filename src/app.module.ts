import { Module } from "@nestjs/common";
import { ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { AccountModule } from "./account/account.module";
import { PrismaModule } from "prisma/prisma.module";
import { WorkModule } from "./work/work.module";
import { MltoolsModule } from './mltools/mltools.module';

@Module({
  imports: [
    AccountModule,
    PrismaModule,
    WorkModule,
    ThrottlerModule.forRoot([
      {
        name: "short",
        ttl: 60,
        limit: 10,
      },
    ]),
    MltoolsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerModule,
    },
  ],
})
export class AppModule {}
