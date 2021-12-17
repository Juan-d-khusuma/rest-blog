/*
  Warnings:

  - Added the required column `data` to the `RToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `RToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RToken" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "data" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
