import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) { }


  @Post(":id")
  create(@Param('id', ParseUUIDPipe) id: string, @Body() createBookDto: CreateBookDto) {
    return this.bookService.create(id, createBookDto);
  }

  @Get(":id")
  findAll(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookService.findAll(id);
  }

  @Get(':id/:authorId')
  findOne(@Param('id', ParseUUIDPipe) id: string, @Param('authorId', ParseUUIDPipe) authorId: string) {
    return this.bookService.findOne(authorId, id);
  }

  @Patch(':id/:authorId')
  update(@Param('id') id: string, @Param('authorId', ParseUUIDPipe) authorId: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(authorId, id, updateBookDto);
  }

  @Delete(':id/:authorId')
  remove(@Param('id', ParseUUIDPipe) id: string, @Param('authorId', ParseUUIDPipe) authorId: string) {
    return this.bookService.remove(authorId, id);
  }
}
