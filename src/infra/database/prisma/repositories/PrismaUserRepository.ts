import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { UserRepository } from "../../../../modules/User/repositories/userRepository.js";
import { UserSchema } from "../../../../modules/User/entities/User.js";
import { ResponseUserDto } from "../../../http/modules/user/dto/ResponseUserDto.js";
import { PrismaUserMapper } from "../mappers/PrismaUserMapper.js";
import { PrismaService } from "../prisma.service.js";

@Injectable()
export class PrismaUserRepository implements UserRepository {

    constructor(private prisma: PrismaService) {}

    async create(user: UserSchema): Promise<void> {

        const userRaw = PrismaUserMapper.toPrisma(user)

        await this.prisma.user.create({ data: userRaw })

    }
    async getAll(): Promise<ResponseUserDto[]> {
        const usersRaw = await this.prisma.user.findMany()
        const res = PrismaUserMapper.toDomain(usersRaw)
        const dataRes: ResponseUserDto[] = []
        res.map(user => {
            dataRes.push({
                id: user.get_id,
                name: user.get_name,
                email: user.get_email,
                role: user.get_role
            })
        })
        return dataRes
    }
    async getById(id: string): Promise<ResponseUserDto | null> {
        const userRaw = await this.prisma.user.findUnique({ where: { id } })
        
        if(!userRaw) throw new Error("User not found")

        const user = PrismaUserMapper.toDomainOne(userRaw)
        const res: ResponseUserDto = {
            id: user.get_id,
            name: user.get_name,
            email: user.get_email,
            role: user.get_role
        }
        return res
    }
    async getByEmail(email: string): Promise<ResponseUserDto | null> {
        const userRaw = await this.prisma.user.findUnique({ where: { email } })

        if(!userRaw) throw new Error("User not found")

        const user = PrismaUserMapper.toDomainOne(userRaw)
        const res: ResponseUserDto = {
            id: user.get_id,
            name: user.get_name,
            email: user.get_email,
            role: user.get_role
        }
        return res
    }
    async update(user: User): Promise<void> {
        const userRaw = PrismaUserMapper.toPrisma(user)

        if(!userRaw.id) throw new Error("User ID is required for update")
        
        if(!userRaw) throw new Error("User not found")

        await this.prisma.user.update({ where: { id: userRaw.id }, data: userRaw })
    }
    async delete(id: string): Promise<void> {

        if(!id) throw new Error("User ID is required for delete")

        await this.prisma.user.delete({ where: { id } })
    }
    
}