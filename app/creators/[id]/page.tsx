"use client";
import { usePathname } from "next/navigation";
import { useWallets } from "@privy-io/react-auth";
import CreatorFeed from "./CreatorFeed";
import { useMyContext } from "@/context/appcontext";
import useHandleBuyToken from "@/app/hooks/handleBuyToken";
import useHandleSellToken from "@/app/hooks/handleSellToken";
import useGetTokenPrice from "@/app/hooks/useGetTokenPrice";
import { BigNumber } from "ethers";

const CreatorDetail = ({ params }: { params: { id: string } }) => {
  const contract = params.id;
  const { myInteger, setTokenSupply } = useMyContext();
  const router = usePathname();

  const { wallets } = useWallets();
  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType === "privy"
  );
  const { trigger: buyTrigger } = useHandleBuyToken(contract, 1);
  const { trigger: sellTrigger } = useHandleSellToken(contract, 1);

  const { blob, refetch } = useGetTokenPrice(contract, embeddedWallet?.address!);

  // Replace this with your creator data retrieval logic based on the ID
  // For this example, we'll use dummy data again.
  const creator = {
    id: contract,
    name: `Creator ${contract}`,
    description: `Description for Creator ${contract}`,
    keyPrice: blob?.price,
    subscriptionFee: blob?.fee,
  };

  return (
    <main className="px-10 py-14">
      <div className="text-left">
        {" "}
        {/* Align content to the left */}
        <div className="w-12 h-12 min-w-12 rounded-full overflow-hidden mr-4">
          <img
            src={`/images/pic${myInteger}.gif`} // Replace with the path to your image
            alt="Creator Image"
            width={48} // Set the desired width
            height={48} // Set the desired height
          />
        </div>
        <h1 className="text-3xl font-semibold text-blue-500">{creator.name}</h1>
      </div>

      <div className="flex justify-start mt-4">
        {" "}
        {/* Align content to the left */}
        <div className="flex items-center">
          <div className="bg-blue-500 text-white p-2 rounded">
            <p className="font-semibold">Wallet Address</p>
          </div>
          <button
            className="ml-2 bg-orange-500 text-white p-2 rounded"
            onClick={async () => {
              if (!blob?.rawPrice || !blob.rawFee || !blob.rawRemainingDeposit ) {
                return;
              }

              let price = BigNumber.from(blob.rawPrice)
              const rd = BigNumber.from(blob.rawRemainingDeposit)
              const fee = BigNumber.from(blob.rawFee)
              if (rd.lt(fee)){
                price = price.add(fee.sub(rd)).add(1)
              }
              console.log({price})

              const success = await buyTrigger(price);
              if (success) {
                refetch();
                setTokenSupply(blob?.supply);
              }
            }}
          >
          <p className="font-semibold">Buy</p>
          </button>
          <button
            className="ml-2 bg-orange-500 text-white p-2 rounded"
            onClick={async () => {
              const s = await sellTrigger();
              if (s) {
                refetch();
                setTokenSupply(blob?.supply ? blob?.supply : '0');
              }
            }}
          >
            <p className="font-semibold">Sell</p>
          </button>
        </div>
      </div>
      <div className="text-2xl mt-4 font-semibold">{creator.keyPrice} ETH</div>

      <div className="text-left mt-2">
        {" "}
        {/* Align content to the left */}
        <p className="text-xl text-white-600">{`SUBSCRIPTION FEE: ${creator.subscriptionFee} ETH / MONTH (EST.)`}</p>
      </div>

      <div className="text-left mt-2">
        {" "}
        {/* Align content to the left */}
        <p className="text-white-200">(goes directly to the artist)</p>
      </div>
      <CreatorFeed />
    </main>
  );
};
export default CreatorDetail;
