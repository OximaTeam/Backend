import { Module } from '@nestjs/common';
import { NearblocksController } from './nearblocks.controller';
import { NearblocksService } from './nearblocks.service';

@Module({
  controllers: [NearblocksController],
  providers: [NearblocksService]
})
export class NearblocksModule {}
