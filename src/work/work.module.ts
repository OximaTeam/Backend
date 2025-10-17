import { Module } from '@nestjs/common';
import { FoldersModule } from './folders/folders.module';
import { NotesModule } from './notes/notes.module';
import { BlocksModule } from './blocks/blocks.module';

@Module({
  imports: [FoldersModule, NotesModule, BlocksModule]
})
export class WorkModule {}
