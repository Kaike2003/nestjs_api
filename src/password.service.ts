import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';


@Injectable()
export class PasswordService {
    
    public async encript(password: string) {

        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);

        return hash
    }

    public async compare(password: string, hash: string) {

        const isMatch = await bcrypt.compare(password, hash);

        if (isMatch === true) {
            return isMatch
        } else {
            return isMatch
        }

    }
}