import { Module } from "@nestjs/common";
import { ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { AccountModule } from "./account/account.module";
import { PrismaModule } from "prisma/prisma.module";
import { WorkModule } from "./work/work.module";

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
