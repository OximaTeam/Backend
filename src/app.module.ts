import { Module } from "@nestjs/common";
import { ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD, APP_PIPE } from "@nestjs/core";
import { AccountModule } from "./account/account.module";
import { PrismaModule } from "prisma/prisma.module";
import { ZodValidationPipe } from "./common/pipes/ZodPipe";

@Module({
  imports: [
    AccountModule,
    PrismaModule,
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
