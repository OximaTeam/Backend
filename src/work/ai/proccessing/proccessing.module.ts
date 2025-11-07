import { Module } from "@nestjs/common";
import { Proccessing } from "./proccessing.gateway";
import { ProccessingService } from "./proccessing.service";

@Module({
  providers: [Proccessing, ProccessingService],
})
export class ProccessingModule {}
