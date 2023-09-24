'use client'
import {useWallets} from '@privy-io/react-auth';
import Link from 'next/link';

const CreatorsList = () => {
  const { wallets } = useWallets();
  const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === 'privy');

  // Replace this with your creator data. For this example, I'll use dummy data.
  const creators = [
    {
      id: 1,
      name: 'Creator 1',
      description: 'Description for Creator 1',
    },
    {
      id: 2,
      name: 'Creator 2',
      description: 'Description for Creator 2',
    },
    // Add more creators as needed
  ];

  return (
    <main className="px-10 py-14">
      <h1 className="text-3xl font-semibold text-blue-500">Creators List</h1>
      <div className="mt-4">
        {creators.map((creator) => (
          <Link key={creator.id} href={`/creators/${creator.id}`}>
              <div className="bg-white p-4 mb-4 rounded shadow">
                <h2 className="text-xl font-semibold">{creator.name}</h2>
                <p className="text-gray-600">{creator.description}</p>
                {/* Add more creator information as needed */}
              </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default CreatorsList;