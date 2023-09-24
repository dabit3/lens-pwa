'use client'
import { usePathname } from 'next/navigation';
import { useWallets } from '@privy-io/react-auth';
import CreatorFeed from './CreatorFeed';
import { useMyContext } from '@/context/appcontext';
import Image from 'next/image';
import useHandleBuyToken from '@/app/hooks/handleBuyToken';
import useHandleSellToken from '@/app/hooks/handleSellToken';
import { useEffect } from 'react';

const CreatorDetail = ({ params }: { params: { id: string } }) => {
  const { myInteger } = useMyContext();
  const router = usePathname();
  console.log(router);
  
  const { wallets } = useWallets();
  const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === 'privy');
  const { trigger: buyTrigger, status: buyStatus } = useHandleBuyToken(params.id, 1);
  const { trigger: sellTrigger, status: sellStatus } = useHandleSellToken(params.id, 1);

  // useEffect(() => {
  //   console.log(sellStatus);
  // }, [sellStatus])

  // useEffect(() => {
  //   console.log(buyStatus);
  // }, [buyStatus])




    // Replace this with your creator data retrieval logic based on the ID
    // For this example, we'll use dummy data again.
    const creator = {
      id: params.id,
      name: `Creator ${params.id}`,
      description: `Description for Creator ${params.id}`,
      keyPrice: 10.8,
      subscriptionFee: 0.83,
    };
    console.log(myInteger);

    return (
      <main className="px-10 py-14">
        <div className="text-left"> {/* Align content to the left */}
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

        <div className="flex justify-start mt-4"> {/* Align content to the left */}
          <div className="flex items-center">
            <div className="bg-blue-500 text-white p-2 rounded">
              <p className="font-semibold">Wallet Address</p>
            </div>
            <button className="ml-2 bg-orange-500 text-white p-2 rounded" onClick={buyTrigger}>
              <p className="font-semibold">Buy</p>
            </button>
            <button className="ml-2 bg-orange-500 text-white p-2 rounded" onClick={sellTrigger}>
              <p className="font-semibold">Sell</p>
            </button>
          </div>
        </div>
        <div className="text-2xl mt-4 font-semibold">{creator.keyPrice} ETH</div>

        <div className="text-left mt-2"> {/* Align content to the left */}
          <p className="text-xl text-white-600">{`SUBSCRIPTION FEE: ${creator.subscriptionFee} ETH / MONTH (EST.)`}</p>
        </div>

        <div className="text-left mt-2"> {/* Align content to the left */}
          <p className="text-white-200">(goes directly to the artist)</p>
        </div>
        <CreatorFeed/>
      </main>
    );
  };
  export default CreatorDetail;

