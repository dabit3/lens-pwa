'use client'
import {useWallets} from '@privy-io/react-auth';
import { SignMessageButton } from './SignButton';

export default function Search() {
  const {wallets} = useWallets();
  const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === 'privy');
  console.log(embeddedWallet);
  return (
    <main className="px-10 py-14">
      <div>
      <SignMessageButton />
      <p>Search coming soon.</p>
    </div>
    </main>
  )
}