import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService<T> {
  constructor(private readonly filePath: string) {}

  read(): T {
    const fullPath = path.join(process.cwd(), this.filePath);
    if (!fs.existsSync(fullPath)) {
      return [] as T;
    }
    const content = fs.readFileSync(fullPath, 'utf-8');
    return JSON.parse(content) as T;
  }

  write(data: T): void {
    const fullPath = path.join(process.cwd(), this.filePath);
    fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
  }

  add(item: any): void {
    const data = this.read() as any[];
    data.push(item);
    this.write(data as T);
  }
} 