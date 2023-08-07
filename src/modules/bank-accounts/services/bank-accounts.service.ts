import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';
import { ValidateBankAccountOwnershipService } from './validate-bank-accounts-ownership.service';
import { BankAccount } from '@prisma/client';
import { TransactionType } from 'src/modules/transactions/entities/Transaction';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
    private readonly verifyBankAccountOwnership: ValidateBankAccountOwnershipService,
  ) {}
  create(
    userId: string,
    { color, initialBalance, name, type }: CreateBankAccountDto,
  ) {
    return this.bankAccountsRepository.create({
      data: {
        color,
        initialBalance,
        name,
        type,
        userId,
      },
    });
  }

  async findAllByUserId(userId: string) {
    const bankAccounts = await this.bankAccountsRepository.findMany({
      where: {
        userId,
      },
      include:{
        transactions:{
          select:{
            type:true,
            value:true
          }
        }
      }
    }) 

    return bankAccounts.map(({transactions,...bankAccount})=>{
      const currentBalance = transactions.reduce((acc,transaction)=>(
        acc + (transaction.type === 'INCOME' ? transaction.value : -transaction.value)
      ),0)
      return {
        currentBalance:currentBalance + bankAccount.initialBalance,
        ...bankAccount,
      }
    })
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    await this.verifyBankAccountOwnership.verify(userId, bankAccountId);

    return this.bankAccountsRepository.update({
      where: {
        id: bankAccountId,
      },
      data: {
        ...updateBankAccountDto,
      },
    });
  }

  async remove(userId: string, bankAccountId: string) {
    await this.verifyBankAccountOwnership.verify(userId, bankAccountId);
    return this.bankAccountsRepository.delete({
      where: {
        id: bankAccountId,
      },
    });
  }
}
