import { Module } from "@nestjs/common";
import { ContextModule } from "./context/context.module";

@Module({
  imports: [ContextModule],
})
export class MltoolsModule {}
