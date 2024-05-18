import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookRepository } from './book.repository';

@Injectable()
export class BookService {

  constructor(private readonly bookRepository: BookRepository) { }

  create(id: string, createBookDto: CreateBookDto) {
    return this.bookRepository.create(id, createBookDto)
  }

  findAll(id: string) {
    return this.bookRepository.findAll(id)
  }

  findOne(authorId: string, id: string) {
    return this.bookRepository.findOne(authorId, id)
  }

  update(authorId, id: string, updateBookDto: UpdateBookDto) {
    return this.bookRepository.update(authorId, id, updateBookDto)
  }

  remove(authorId: string, id: string) {
    return this.bookRepository.remove(authorId, id)
  }
}
