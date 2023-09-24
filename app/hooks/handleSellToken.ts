import { useState, useEffect } from "react";
import { ShareSample__factory } from "@/typechain";
import { useWallets } from "@privy-io/react-auth";

const useHandleSellToken = (contract: string, amount: number) => {
  const { wallets } = useWallets();
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");

  useEffect(() => {
    const embeddedWallet = wallets.find(
      (wallet) => wallet.walletClientType === "privy"
    );
    if (!embeddedWallet) {
      setStatus("error");
      throw new Error("embedded wallet empty");
    }

    const run = async () => {
      try {
        setStatus("pending");
        embeddedWallet.switchChain(1337);
        const provider = await embeddedWallet.getEthersProvider(); // ethers provider object
        const signer = provider.getSigner(); // ethers signer object
        const fac = ShareSample__factory.connect(contract, signer);
        await fac.sellShares(amount);
        setStatus("success");
      } catch (error) {
        console.error("Error buying token:", error);
        setStatus("error");
      }
    };

    run();
  }, [contract, amount, wallets]);

  return status;
};

export default useHandleSellToken;
