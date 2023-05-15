/*
  Warnings:

  - Made the column `go_to` on table `notifications` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "notifications" ALTER COLUMN "go_to" SET NOT NULL;
