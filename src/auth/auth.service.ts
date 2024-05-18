import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/module/user/user.service';
import { PasswordService } from 'src/password.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly passwordService: PasswordService
    ) { }

    async signIn(email: string, pass: string): Promise<{ access_token: string }> {

        const user = await this.userService.findEmail(email)

        const verifypassword = await this.passwordService.compare(pass, user.password)

        if (verifypassword === false) {
            throw new UnauthorizedException("Password incorrecta.");
        }

        //if (user?.password != pass) {
        //  throw new UnauthorizedException();
        // }

        const payload = { sub: user.id, email: user.email }

        return {
            access_token: await this.jwtService.signAsync(payload)
        }

    }

}
