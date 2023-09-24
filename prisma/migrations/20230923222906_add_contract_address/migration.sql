/*
  Warnings:

  - You are about to drop the column `creatorWalletAddress` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `subscriberWalletAddress` on the `Subscription` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[creatorContractAddress,fanPublicAddress]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contractAddress]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `creatorContractAddress` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fanPublicAddress` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contractAddress` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Subscription_creatorWalletAddress_subscriberWalletAddress_key";

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "creatorWalletAddress",
DROP COLUMN "subscriberWalletAddress",
ADD COLUMN     "creatorContractAddress" VARCHAR(255) NOT NULL,
ADD COLUMN     "fanPublicAddress" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "contractAddress" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_creatorContractAddress_fanPublicAddress_key" ON "Subscription"("creatorContractAddress", "fanPublicAddress");

-- CreateIndex
CREATE UNIQUE INDEX "User_contractAddress_key" ON "User"("contractAddress");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_creatorContractAddress_fkey" FOREIGN KEY ("creatorContractAddress") REFERENCES "User"("contractAddress") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_fanPublicAddress_fkey" FOREIGN KEY ("fanPublicAddress") REFERENCES "User"("walletAddress") ON DELETE RESTRICT ON UPDATE CASCADE;
