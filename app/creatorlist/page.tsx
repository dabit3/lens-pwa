"use client";
import { Spinner } from "@/components/spinner";
import { useMyContext } from "@/context/appcontext";
import { useWallets } from "@privy-io/react-auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import useHandleGetTokenPrice from "../hooks/useGetTokenPrice";
interface ContractData {
  contractAddress: string;
  createdAt: string;
  id: number;
  walletAddress: string;
}

const CreatorsList = () => {
  const { wallets } = useWallets();
  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType === "privy"
  );

  const [newCreators, setCreators] = useState<ContractData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/users"); // Replace with your API endpoint
        // console.log(response);
        if (response.ok) {
          const data = await response.json();
          setCreators(data.body); // Assuming the user data is an array in the response
          console.log(data.body); // Add this line
        } else {
          console.error("Failed to fetch data from the API");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <main className="px-10 py-14">
      <h1 className="text-3xl font-semibold text-blue-500">Creators List</h1>
      <div className="mt-4">
        {newCreators && newCreators.length > 0 && embeddedWallet?.address ? (
          newCreators.map((creator, index) => (
            <CreatorCard
              key={index}
              index={index}
              contract={creator.contractAddress}
              userWallet={embeddedWallet.address}
            />
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </main>
  );
};

function CreatorCard({
  index,
  contract,
  userWallet,
}: {
  index: number;
  contract: string;
  userWallet: string;
}) {
  const creatorNames = ["Vitalik", "Toly", "Brian", "Ryan"];
  const creatorDescriptions = [
    "Co-founder of Ethereum",
    "Blockchain developer",
    "Cryptocurrency analyst",
    "Crypto investor",
  ];

  const { setMyInteger } = useMyContext();

  const { refetch, blob } = useHandleGetTokenPrice(contract, userWallet);
  console.log({blob})
  return (
    <Link
      key={index}
      href={`/creators/${contract}`}
      onClick={() => setMyInteger(index)}
    >
      <div className="bg-white p-4 mb-4 rounded shadow flex items-center justify-between">
        {" "}
        {/* Added justify-between */}
        <div className="flex items-center">
          {" "}
          {/* Added flex and items-center */}
          <div className="w-12 h-12 min-w-12 rounded-full overflow-hidden mr-4">
            <img
              src={`images/pic${index}.gif`} // Replace with the path to your image
              alt="Creator Image"
              width={48} // Set the desired width
              height={48} // Set the desired height
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-black">
              {creatorNames[index]}
            </h2>
            <p className="text-gray-600">{creatorDescriptions[index]}</p>
          </div>
        </div>
        <div className="text-right">
          {/* {creatorPrices.length === newCreators.length ? (
            <p className="text-2xl font-semibold text-black">
              {creatorPrices[index]} ETH
            </p>
          ) : (
            <Spinner />
          )}{" "}
          Added the "20 ETH" text */}
        </div>
      </div>
    </Link>
  );
}

export default CreatorsList;
