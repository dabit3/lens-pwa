"use client";
import "./globals.css";
import { polygonMumbai, polygon } from "wagmi/chains";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";
import { LensProvider, production, development } from "@lens-protocol/react-web";
import { PrivyProvider, ConnectedWallet, useWallets } from '@privy-io/react-auth'
import { useRef } from 'react'

const { publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai, polygon],
  [publicProvider()]
)

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: [
    new InjectedConnector({
      options: {
        shimDisconnect: false,
      },
    }),
  ]
})

export default function Provider({
  children, handleLogin
}: {
  children: React.ReactNode;
  handleLogin: (user: any) => void;
}) {
  const { wallets } = useWallets()
  const currentWallet = useRef<ConnectedWallet | null>(wallets[0] || null)

  const privyConfig = {
    bindings: {
        getProvider: async ({chainId}: {chainId?: number}) => {
            if (!currentWallet.current) throw new Error('No provider');
            if (chainId) await currentWallet.current.switchChain(chainId);
            const provider = await currentWallet.current.getEthersProvider();
            return provider;
        },
        getSigner: async ({chainId}: {chainId?: number}) => {
            if (!currentWallet.current) throw new Error('No signer');
            if (chainId) await currentWallet.current.switchChain(chainId);
            const provider = await currentWallet.current.getEthersProvider();
            return await provider.getSigner();
        }
    },
    environment: production,
  }

  return (
    <WagmiConfig config={config}>
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
        onSuccess={handleLogin}
        config={{
          loginMethods: ['email', 'wallet', 'google', 'apple'],
          appearance: {
            theme: 'dark',
            accentColor: '#676FFF',
            logo: 'https://i.imgur.com/tzKMWv9.png',
          },
          embeddedWallets: {
            createOnLogin: 'all-users',
            noPromptOnSignature: true
          }
        }}
      >
      <LensProvider config={privyConfig}>
        {children}
      </LensProvider>
      </PrivyProvider>
    </WagmiConfig>
  );
}
