/*
  Warnings:

  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Session";

-- CreateTable
CREATE TABLE "RToken" (
    "guid" TEXT NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "RToken_pkey" PRIMARY KEY ("guid")
);
