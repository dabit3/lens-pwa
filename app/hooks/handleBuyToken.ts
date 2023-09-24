import { useState, useEffect } from "react";
import { ShareSample__factory } from "@/typechain";
import { useWallets } from "@privy-io/react-auth";
import { useMyContext } from "@/context/appcontext";

const useHandleBuyToken = (contract: string, amount: number) => {
  const { wallets } = useWallets();
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");

  console.log("here");
  const { chainId } = useMyContext();
  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType === "privy"
  );
  if (!embeddedWallet) {
    setStatus("error");
    throw new Error("embedded wallet empty");
  }

  const trigger = async () => {
    try {
      setStatus("pending");
      embeddedWallet.switchChain(chainId);
      const provider = await embeddedWallet.getEthersProvider(); // ethers provider object
      const signer = provider.getSigner(); // ethers signer object
      const fac = ShareSample__factory.connect(contract, signer);
      const tx = await fac.buyShares(amount);
      const res = await tx.wait();
      res.status === 1 ? setStatus("success") : setStatus("error");
      console.log({ status: res.status });
    } catch (error) {
      console.error("Error buying token:", error);
      setStatus("error");
    }
  };

  return { trigger, status };
};

export default useHandleBuyToken;
