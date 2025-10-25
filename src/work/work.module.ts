import { Module } from '@nestjs/common';
import { FoldersModule } from './folders/folders.module';
import { NotesModule } from './notes/notes.module';
import { BlocksModule } from './blocks/blocks.module';
import { InfoModule } from './info/info.module';

@Module({
  imports: [FoldersModule, NotesModule, BlocksModule, InfoModule]
})
export class WorkModule {}
