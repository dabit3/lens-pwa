'use client'
import { usePathname } from 'next/navigation';
import { useWallets } from '@privy-io/react-auth';

const CreatorDetail = ({ params }: { params: { id: string } }) => {
  const router = usePathname();
  console.log(router);
  // const id = router?.split('/')[2]; // Get the creator ID from the URL
  const { wallets } = useWallets();
  const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === 'privy');

  // Replace this with your creator data retrieval logic based on the ID
  // For this example, we'll use dummy data again.
  const creator = {
    id: params.id,
    name: `Creator ${params.id}`,
    description: `Description for Creator ${params.id}`,
  };

  return (
    <main className="px-10 py-14">
      <h1 className="text-3xl font-semibold text-blue-500">{creator.name}</h1>
      <p className="text-gray-600">{creator.description}</p>
      {/* Add more creator information as needed */}
    </main>
  );
};

export default CreatorDetail;
