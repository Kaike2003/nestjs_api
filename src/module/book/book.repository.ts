import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { PrismaService } from 'src/prisma.service';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookRepository extends PrismaService {

    private async verifyuser(id: string) {
        const verifyid = await this.user.findUnique({
            where: {
                id: id
            }
        })

        return verifyid
    }

    private async verifybook(id: string) {
        const verifyid = await this.book.findUnique({
            where: {
                id: id
            }
        })

        return verifyid
    }

    async create(id: string, createBook: CreateBookDto) {

        const { description, title } = createBook

        const user = await this.verifyuser(id)

        if (user === null) {
            throw new BadGatewayException("O id do usuário é inválido.")
        } else {

            return this.book.create({
                data: {
                    title: title,
                    description: description,
                    authorId: id
                }
            })
                .then(() => {
                    return "Book criado."
                })
                .catch(async error => {
                    throw new BadGatewayException(error)
                })

        }

    }

    async findAll(id: string) {

        const user = await this.verifyuser(id)

        if (user === null) {
            throw new BadGatewayException(user)
        } else {

            return this.book.findMany({
                where: {
                    authorId: id
                }
            })
                .then(async success => {
                    return success
                })
                .catch(async error => {
                    throw new BadGatewayException(error)
                })

        }



    }

    async update(authorId: string, id: string, updateBook: UpdateBookDto) {

        const { description, title } = updateBook
        const user = await this.verifyuser(authorId)
        const book = await this.verifybook(id)

        if (user === null) {
            throw new BadGatewayException("Usuário não existe.")
        } else {

            if (book === null) {
                throw new BadGatewayException("Book que pretende atualizar não existe.")
            } else {

                if (book.authorId === user.id) {

                    return await this.book.update({
                        where: {
                            id: id,
                            authorId: authorId
                        },
                        data: {
                            title: title,
                            description: description
                        }
                    })
                        .then(() => {
                            return "Book atualizado"
                        })
                        .catch(async error => {
                            throw new BadGatewayException(error)
                        })

                } else {
                    throw new BadGatewayException(`Impossivel atualizar esse book.`)
                }

            }

        }


    }

    async findOne(authorId: string, id: string) {

        const user = await this.verifyuser(authorId)
        const book = await this.verifybook(id)

        if (user === null) {
            throw new BadGatewayException("Usuário não existe.")
        } else {

            if (book === null) {
                throw new BadGatewayException("Livro que pretende visualizar não existe.")
            } else {

                if (book.authorId === user.id) {
                    return this.book.findUnique({
                        where: {
                            id: id
                        }
                    })
                        .then(async success => {
                            return success
                        })
                        .catch(async error => {
                            throw new BadGatewayException(error)
                        })
                } else {
                    throw new BadGatewayException(`Impossivel visualizar esse book.`)
                }

            }



        }

    }

    async remove(authorId: string, id: string) {

        const user = await this.verifyuser(authorId)
        const book = await this.verifybook(id)

        if (user == null) {
            throw new BadGatewayException("Usuário não existe.")
        } else {

            if (book === null) {
                throw new BadGatewayException("Book que pretende deletar não existe.")
            } else {

                if (book.authorId === user.id) {

                    return this.book.delete({
                        where: {
                            id: id,
                            authorId: authorId
                        }
                    })
                        .then(() => {
                            return "Book deletado"
                        })
                        .catch(async error => {
                            throw new BadGatewayException(error)
                        })

                } else {
                    throw new BadGatewayException(`Impossivel deletar esse book.`)
                }

            }

        }

    }

}
