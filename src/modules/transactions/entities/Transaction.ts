export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'

}

export type ValidateOwnershipParams = {
  userId:string,
  bankAccountId?:string,
  categoryId?:string
  transactionId?:string
}