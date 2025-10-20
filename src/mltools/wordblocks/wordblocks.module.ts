import { Module } from '@nestjs/common';
import { WordblocksController } from './wordblocks.controller';
import { WordblocksService } from './wordblocks.service';

@Module({
  controllers: [WordblocksController],
  providers: [WordblocksService]
})
export class WordblocksModule {}
