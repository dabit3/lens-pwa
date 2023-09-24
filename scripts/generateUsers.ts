import { getKeyContractFactoryProvider } from "../utils/ethers";
import prisma from "../utils/prisma";

const addresses = [
  "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
];

async function run() {
  const factory = getKeyContractFactoryProvider();
  for (const address of addresses) {
    const tx = await factory.createShareSample(address);
    await prisma.user.upsert({
      create: {
        walletAddress: address,
        contractAddress: tx.data,
      },
      update: {
        contractAddress: tx.data,
      },
      where: {
        walletAddress: address,
      },
    });
  }
}

run().then(() => console.log("done"));
