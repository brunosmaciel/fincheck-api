import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { type Prisma } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}
  create(createDTO: Prisma.UserCreateArgs) {
    return this.prismaService.user.create(createDTO);
  }
  findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
      select: { id: true },
    });
  }
  findUnique(findUniqueDTO: Prisma.UserFindUniqueArgs) {
    return this.prismaService.user.findUnique(findUniqueDTO);
  }
}
