import { getKeyContractFactoryProvider } from "../utils/ethers";
import prisma from "../utils/prisma";

async function run() {
  const addres = [
    "0xbDF88a5969aE589286c4504a21c83EEe37C82164",
    "0xf9C0B3fb63F704F8BdDfaf1267CBBd8dbe34EC8a",
  ];
  const factory = getKeyContractFactoryProvider();
  for (const address of addres) {
    try {
      const tx = await factory.createShareSample(address);
      await tx.wait();
    } catch (error) {
      console.log(error);
      continue;
    }
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

run().then(() => console.log("done"));
