import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.reposititory';
import { Response } from 'express';
import { UpdateEmailUserDto } from './dto/update-email-user.dto';

@Injectable()
export class UserService {

  constructor(private readonly userRepository: UserRepository) { }

  create(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto)
  }

  findAll() {
    return this.userRepository.findAll()
  }

  findOne(id: string) {
    return this.userRepository.findOne(id)
  }

  findEmail(email: string) {
    return this.userRepository.findEmail(email)
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto)
  }

  updateEmail(id: string, updateEmailUserDto: UpdateEmailUserDto, res: Response) {
    return this.userRepository.updateEmail(id, updateEmailUserDto, res)
  }

  remove(id: string) {
    return this.userRepository.remove(id)
  }
}
