import { Module } from '@nestjs/common';
import { NearblocksModule } from './nearblocks/nearblocks.module';
import { WordblocksModule } from './wordblocks/wordblocks.module';

@Module({
  imports: [NearblocksModule, WordblocksModule]
})
export class MltoolsModule {}
