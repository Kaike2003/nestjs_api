import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/module/user/user.service';
import { UserRepository } from 'src/module/user/user.reposititory';
import { JwtModule, } from '@nestjs/jwt';
import { UserModule } from 'src/module/user/user.module';
import { jwtConstants } from './constants';
import { PasswordService } from 'src/password.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, UserRepository, PasswordService]
})
export class AuthModule { }
