import { Module } from '@nestjs/common';
import { FileService } from './file.service';

@Module({
  providers: [
    {
      provide: FileService,
      useFactory: () => new FileService('src/assets/stocks.json'),
    },
  ],
  exports: [FileService],
})
export class FileModule {} 