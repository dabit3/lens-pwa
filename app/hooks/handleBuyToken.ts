import { useState, useEffect } from "react";
import { ShareSample__factory } from "@/typechain";
import { useWallets } from "@privy-io/react-auth";
import { useMyContext } from "@/context/appcontext";
import { BigNumber } from "ethers";

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
      const signer = provider.getSigner(); // ethers signer object
      const fac = ShareSample__factory.connect(contract, signer);
      const tx = await fac.buyShares(amount);
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
