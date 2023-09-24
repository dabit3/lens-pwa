import { getKeyContractFactoryProvider } from "../utils/ethers";
import prisma from "../utils/prisma";

const addresses = [
  "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
];

async function run() {
  const factory = getKeyContractFactoryProvider();
  addresses.forEach(async (address) => {
    const tx = await factory.createShareSample(address);
    await prisma.user.create({
      data: {
        walletAddress: address,
        contractAddress: tx.data,
      },
    });
  });
}

run().then(() => console.log("done"));
