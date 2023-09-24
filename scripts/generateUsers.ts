import { getKeyContractFactoryProvider } from "../utils/ethers";
import prisma from "../utils/prisma";

const addresses = [
  "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
  "0xbDF88a5969aE589286c4504a21c83EEe37C82164",
  "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f",
];

async function run() {
  const factory = getKeyContractFactoryProvider();
  for (const address of addresses) {
    try {
      const tx = await factory.createShareSample(address);
      await tx.wait();
    } catch (error) {
      console.log(error);
      continue;
    }

    const [addresses, contracts] = await factory.getDeployedContracts();
    for (let i = 0; i < addresses.length; i++) {
      const address = addresses[i];
      const contract = contracts[i];

      await prisma.user.upsert({
        create: {
          walletAddress: address,
          contractAddress: contract,
        },
        update: {
          contractAddress: contract,
        },
        where: {
          walletAddress: address,
        },
      });
    }
  }
}

run().then(() => console.log("done"));
