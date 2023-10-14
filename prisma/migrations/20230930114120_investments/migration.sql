-- CreateEnum
CREATE TYPE "InvestmentType" AS ENUM ('stocks', 'etf', 'index', 'forex', 'crypto', 'metals', 'real_estate');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "risk_appetite" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "investments" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "type" "InvestmentType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "investments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "investments" ADD CONSTRAINT "investments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
