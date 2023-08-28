/*
  Warnings:

  - Added the required column `loan_risk` to the `loans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "loans" ADD COLUMN     "loan_risk" DOUBLE PRECISION NOT NULL;
