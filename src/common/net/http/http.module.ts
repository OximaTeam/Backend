import { Global, Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { HttpServiceCust } from "./http.service";

@Global()
@Module({
  imports: [
    HttpModule.register({
      timeout: 600000,
      maxRedirects: 5,
    }),
  ],
  providers: [HttpServiceCust],
  exports: [HttpServiceCust],
})
export class HttpModuleCust {}
