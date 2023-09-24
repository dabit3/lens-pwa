import { useState, useEffect } from "react";
import { ShareSample__factory } from "@/typechain";
import { useWallets } from "@privy-io/react-auth";

interface ContractData {
  contractAddress: string;
  createdAt: string;
  id: number;
  walletAddress: string;
}

const useHandleGetTokenPrice = (contractData: ContractData[]) => {
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");

  const fetchData = async () => {
    try {
      setStatus("pending");
      const creatorPricePromises = contractData.map(async (creator) => {
        const { contractAddress, walletAddress } = creator;

        // const apiUrl = `/api/getContractDetails?contractAddress=${walletAddress}&walletAddress=${contractAddress}`;
        const apiUrl = `/api/getContractDetails?contractAddress=${contractAddress}&walletAddress=${walletAddress}`;


        // const response = await fetch(apiUrl, {
        //   method: 'GET',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // });

        const response = await fetch(apiUrl);

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          return data; // Return the fetched data for this creator
        } else {
          console.error(`FAIL BAD`);
          return null; // Return null for failed fetch
        }
      });
      const creatorPriceData = await Promise.all(creatorPricePromises);
      console.log(creatorPriceData);
      setStatus("success");
    } catch (error) {
      console.error("Error buying token:", error);
      setStatus("error");
    }
  };

  // Function to trigger a refetch
  const refetch = () => {
    fetchData();
  };

  return { status, refetch };
};

export default useHandleGetTokenPrice;
