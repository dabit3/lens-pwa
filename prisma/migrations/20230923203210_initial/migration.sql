-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "uri" VARCHAR(2048) NOT NULL,
    "caption" VARCHAR(255) NOT NULL,
    "creatorWalletAddress" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "walletAddress" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "creatorWalletAddress" VARCHAR(255) NOT NULL,
    "subscriberWalletAddress" VARCHAR(255) NOT NULL,
    "numKeys" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_walletAddress_key" ON "User"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_creatorWalletAddress_subscriberWalletAddress_key" ON "Subscription"("creatorWalletAddress", "subscriberWalletAddress");
