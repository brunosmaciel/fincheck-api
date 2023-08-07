import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { type Prisma } from '@prisma/client';

@Injectable()
export class BankAccountsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createBankAccountDTO: Prisma.BankAccountCreateArgs) {
    return this.prismaService.bankAccount.create(createBankAccountDTO);
  }
  ​async findMany<T extends Prisma.BankAccountFindManyArgs>( findManyDto: Prisma.SelectSubset<T, Prisma.BankAccountFindManyArgs>, ) { return this.prismaService.bankAccount.findMany(findManyDto); }
  findFirst(findFirstDTO: Prisma.BankAccountFindFirstArgs) {
    return this.prismaService.bankAccount.findFirst(findFirstDTO);
  }
  update(updateDTO: Prisma.BankAccountUpdateArgs) {
    return this.prismaService.bankAccount.update(updateDTO);
  }
  delete(deleteDTO: Prisma.BankAccountDeleteArgs) {
    return this.prismaService.bankAccount.delete(deleteDTO);
  }
}
