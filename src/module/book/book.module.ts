import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { BookRepository } from './book.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BookController],
  providers: [BookService, BookRepository, PrismaService],
})
export class BookModule { }
