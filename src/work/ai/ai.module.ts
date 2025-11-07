import { Module } from '@nestjs/common';
import { ProccessingModule } from './proccessing/proccessing.module';

@Module({
  imports: [ProccessingModule]
})
export class AiModule {}
