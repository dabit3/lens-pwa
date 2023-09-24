import { useState, useEffect } from "react";
import { ShareSample__factory } from "@/typechain";
import { useWallets } from "@privy-io/react-auth";
import { InfoBlob } from "../types";

interface ContractData {
  contractAddress: string;
  createdAt: string;
  id: number;
  walletAddress: string;
}

const useGetTokenPrice = (artistContract: string, userWallet: string) => {
  const [blob, setBlob] = useState<InfoBlob | undefined>(undefined);

  const fetchData = async () => {
    const apiUrl = `/api/getContractDetails?contractAddress=${artistContract}&walletAddress=${userWallet}`;
    const response = await fetch(apiUrl);

    if (response.ok) {
      const data = await response.json();
      setBlob(data);
    } else {
      console.error(`FAIL BAD`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to trigger a refetch
  const refetch = () => {
    fetchData();
  };

  return { blob, refetch };
};

export default useGetTokenPrice;
