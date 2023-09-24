import { useState, useEffect } from "react";
import { ShareSample__factory } from "@/typechain";
import { useWallets } from "@privy-io/react-auth";
import { useMyContext } from "@/context/appcontext";
import { BigNumber, ethers } from "ethers";

const useHandleBuyToken = (contract: string, amount: number) => {
  const { wallets } = useWallets();

  const { chainId } = useMyContext();
  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType === "privy"
  );
  if (!embeddedWallet) {
    throw new Error("embedded wallet empty");
  }

  const trigger = async (value: BigNumber) => {
    try {
      embeddedWallet.switchChain(chainId);
      const provider = await embeddedWallet.getEthersProvider(); // ethers provider object
      const signer = provider.getSigner(embeddedWallet?.address);
      console.log({ signer: await signer.getAddress() });
      const fac = ShareSample__factory.connect(contract, signer);
      const options = { value: value.toString() }; // Convert value to Ether and pass as options
      const tx = await fac.buyShares(amount, options);
      const res = await tx.wait();
      return res.status == 1;
    } catch (error) {
      console.error("Error buying token:", error);
    }
    return false;
  };

  return { trigger };
};

export default useHandleBuyToken;
