import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { type Prisma } from '@prisma/client';

@Injectable()
export class TransactionsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createTransactionDTO: Prisma.TransactionCreateArgs) {
    return this.prismaService.transaction.create(createTransactionDTO);
  }
  findMany(findManyDTO: Prisma.TransactionFindManyArgs) {
    return this.prismaService.transaction.findMany(findManyDTO);
  }
  findFirst(findFirstDTO: Prisma.TransactionFindFirstArgs) {
    return this.prismaService.transaction.findFirst(findFirstDTO);
  }
  update(updateDTO: Prisma.TransactionUpdateArgs) {
    return this.prismaService.transaction.update(updateDTO);
  }
  delete(deleteDTO: Prisma.TransactionDeleteArgs) {
    return this.prismaService.transaction.delete(deleteDTO);
  }
}
