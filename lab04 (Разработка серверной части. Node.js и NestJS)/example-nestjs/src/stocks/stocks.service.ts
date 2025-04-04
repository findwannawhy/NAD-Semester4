import { Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { FileService } from '../file/file.service';
import { Stock } from './entities/stock.entity';

@Injectable()
export class StocksService {
  constructor(private fileService: FileService<Stock[]>) {}

  create(createStockDto: CreateStockDto) {
    const stocks = this.fileService.read();

    // Находим максимальный существующий ID и увеличиваем его на 1
    const maxId = stocks.length > 0 ? Math.max(...stocks.map(stock => stock.id)) : 0;
    const stock = { ...createStockDto, id: maxId + 1 };

    this.fileService.add(stock);
  }

  findAll(title?: string): Stock[] {
    const stocks = this.fileService.read();

    return title
      ? stocks.filter((stock) =>
          stock.title.toLowerCase().includes(title.toLowerCase()),
        )
      : stocks;
  }

  findOne(id: number): Stock | null {
    const stocks = this.fileService.read();

    return stocks.find((stock) => stock.id === id) ?? null;
  }

  update(id: number, updateStockDto: UpdateStockDto): void {
    const stocks = this.fileService.read();

    const updatedStocks = stocks.map((stock) =>
      stock.id === id ? { ...stock, ...updateStockDto } : stock,
    );

    this.fileService.write(updatedStocks);
  }

  remove(id: number): void {
    const filteredStocks = this.fileService
      .read()
      .filter((stock) => stock.id !== id);

    this.fileService.write(filteredStocks);
  }
}