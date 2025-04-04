import { Module } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { StocksController } from './stocks.controller';
import { FileModule } from '../file/file.module';

@Module({
  imports: [FileModule],
  controllers: [StocksController],
  providers: [StocksService],
})
export class StocksModule {}