import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.reposititory';
import { PrismaService } from 'src/prisma.service';
import { PasswordService } from 'src/password.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService, PasswordService],
})
export class UserModule { }
