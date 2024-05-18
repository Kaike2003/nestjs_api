import { Controller, Get, Post, Body, Patch, Param, Delete, Res, ParseUUIDPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from "express"
import { UpdateEmailUserDto } from './dto/update-email-user.dto';
import { Public } from 'src/auth/public';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Get('verify/:email')
  findEmail(@Param('email') email: string) {
    return this.userService.findEmail(email);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Patch('email/:id')
  updateEmail(@Param('id', ParseUUIDPipe) id: string, @Body() updateEmailUserDto: UpdateEmailUserDto, @Res() res: Response) {
    return this.userService.updateEmail(id, updateEmailUserDto, res);
  }


  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }
}
