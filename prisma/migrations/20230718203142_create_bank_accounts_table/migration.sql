-- CreateEnum
CREATE TYPE "BankAccoutType" AS ENUM ('CHECKING', 'INVESTMENT', 'CASH');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bank_accounts" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "initial_balance" DOUBLE PRECISION NOT NULL,
    "type" "BankAccoutType" NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "bank_accounts_pkey" PRIMARY KEY ("id")
);
