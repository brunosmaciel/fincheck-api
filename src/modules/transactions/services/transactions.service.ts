import { ValidateBankAccountOwnershipService } from '../../bank-accounts/services/validate-bank-accounts-ownership.service';
import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';
import { ValidateCategoryOwnershipService } from '../../categories/services/validate-category-ownership.service';
import { TransactionType, ValidateOwnershipParams } from '../entities/Transaction';
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service';

@Injectable()
export class TransactionsService {
  constructor(private readonly transactionsRepository:TransactionsRepository,

    private readonly validateBankAccountOwnershipService:ValidateBankAccountOwnershipService,
    private readonly validateCategoryOwnershipService:ValidateCategoryOwnershipService,
    private readonly validateTransactionOwnershipService:ValidateTransactionOwnershipService
    ){}
  async create(userId:string,{bankAccountId,categoryId,date,name,type,value}: CreateTransactionDto) {
    await this.validateOwnership({userId,bankAccountId,categoryId})
    return this.transactionsRepository.create({
      data:{
        date,
        name,
        type,
        value,
        categoryId,
        bankAccountId,
        userId,
      }
    })
  }

  findAllByUserId(userId:string,filters:{month:number,year:number,bankAccountId:string,type:TransactionType}) {
    return this.transactionsRepository.findMany({
      where:{
        userId,
        date:{
          gte:new Date(Date.UTC(filters.year,filters.month)),
          lt: new Date(Date.UTC(filters.year,filters.month + 1) )
        },
        bankAccountId:filters.bankAccountId,
        type:filters.type
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  async update(transactionId: string,userId:string, {bankAccountId,categoryId,date,name,type,value}: UpdateTransactionDto) {
    await this.validateOwnership({userId,bankAccountId,categoryId,transactionId})
    
    return this.transactionsRepository.update({
      where:{
        id:transactionId
      },
      data:{
        bankAccountId,categoryId,date,name,type,value
      }
    })
  }

  async remove(userId:string,transactionId: string) {
    await this.validateOwnership({transactionId,userId})
    
    return this.transactionsRepository.delete({
      where:{
        id:transactionId
      }
    })
  }

  private async validateOwnership({bankAccountId,categoryId,userId,transactionId}:ValidateOwnershipParams){
    await Promise.all([ 
      transactionId && this.validateTransactionOwnershipService.verify(userId,transactionId),
      bankAccountId && this.validateBankAccountOwnershipService.verify(userId,bankAccountId),
      categoryId && this.validateCategoryOwnershipService.verify(userId,categoryId)
      ])

  }
}
