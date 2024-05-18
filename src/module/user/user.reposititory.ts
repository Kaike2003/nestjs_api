import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import { Response } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateEmailUserDto } from './dto/update-email-user.dto';
import { PasswordService } from 'src/password.service';

@Injectable()
export class UserRepository extends PrismaService {

    constructor(private passwordService: PasswordService) {
        super()
    }


    private async verifyuser(email: string, id?: string) {

        if (email === null) {
            return await this.user.findUnique({
                where: {
                    id: id
                }
            })
        } else {
            return await this.user.findUnique({
                where: {
                    email: email
                }
            })
        }

    }

    async create(createUserDto: CreateUserDto) {

        const { email, firstname, lastname, password, username } = createUserDto

        const user = await this.verifyuser(email)

        if (user === null) {

            return await this.user.create({
                data: {
                    email: email,
                    firstname: firstname,
                    lastname: lastname,
                    username: username,
                    password: await this.passwordService.encript(password),
                }
            })
                .then(async success => {
                    success
                    return "Conta criada."
                })
                .catch(async error => {
                    throw new BadRequestException(error)
                })


        } else {
            throw new BadRequestException(`O email ${email} já está sendo usado na aplicação.`)
        }

    }

    async findAll() {

        return await this.user.findMany()

    }

    async findOne(id: string) {

        const user = await this.verifyuser(null, id)

        if (user === null) {
            throw new BadRequestException(`O id do usuario está inválido.`)
        } else {

            return this.user.findUnique({
                where: {
                    id: id
                }
            }).then((success) => {
                return success
            }).catch((error) => {
                throw new BadRequestException(error)
            })


        }

    }

    async findEmail(email: string) {

        const user = await this.verifyuser(email)

        if (user === null) {
            throw new BadRequestException(`O ${email} email digitado não existe.`)
        } else {

            return this.user.findUnique({
                where: {
                    email: email
                }
            }).then((success) => {
                return success
            }).catch((error) => {
                throw new BadRequestException(error)
            })


        }

    }

    async update(id: string, updateUserDto: UpdateUserDto) {

        const { firstname, lastname, password, username } = updateUserDto

        const user = await this.verifyuser(null, id)

        if (user === null) {
            throw new BadRequestException(`O id do usuário está inválido.`)
        } else {

            return this.user.update({
                where: {
                    id: id
                },
                data: {
                    firstname: firstname,
                    lastname: lastname,
                    password: password,
                    username: username
                }
            }).then(async success => {
                return success
            }).catch(async error => {
                throw new BadRequestException(error)
            })

        }

    }

    async updateEmail(id: string, updateEmailUserDto: UpdateEmailUserDto, res: Response) {

        const { email } = updateEmailUserDto

        const user = await this.verifyuser(email)

        if (user === null) {

            await this.user.update({
                where: {
                    id: id
                },
                data: {
                    email: email
                }
            })
                .then(async success => {
                    return `O seu novo email agora é ${success.email}.`
                })
                .catch(async error => {
                    res.status(400).json(error)
                })

        } else {
            throw new BadRequestException(`O email ${email} já está sendo usado na aplicação.`)
        }

    }

    async remove(id: string) {

        const verifyid = await this.user.findUnique({
            where: {
                id: id
            }
        })

        if (verifyid === null) {
            throw new BadRequestException(`O id do usuário está inválido.`)
        } else {

            return await this.user.delete({
                where: {
                    id: id
                }
            })
                .then(async succes => {
                    return `${succes.username} sua conta foi deletada`
                })
                .catch(async error => {
                    throw new BadRequestException(error)
                })

        }



    }

}
