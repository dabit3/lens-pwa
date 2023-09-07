'use client'
import './globals.css'
import { polygonMumbai, polygon } from 'wagmi/chains'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { LensProvider, production } from '@lens-protocol/react-web'
import { ConnectedWallet, useWallets } from '@privy-io/react-auth'
import { useRef } from 'react'
import { useEffect } from 'react'

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

export default function Provider({ children }: {
  children: React.ReactNode
}) {
  const { wallets } = useWallets()
  const currentWallet = useRef<ConnectedWallet | null>(wallets[0] || null)

  useEffect(() => {
    currentWallet.current = wallets[0] || null;
  }, [wallets])

  const privyConfig = {
    bindings: {
      getProvider: async ({chainId}: {chainId?: number}) => {
        if (!currentWallet.current) throw new Error('No provider')
        if (chainId) await currentWallet.current.switchChain(chainId)
        const provider = await currentWallet.current.getEthersProvider()
        return provider
      },
      getSigner: async ({chainId}: {chainId?: number}) => {
        if (!currentWallet.current) throw new Error('No signer')
        if (chainId) await currentWallet.current.switchChain(chainId)
        const provider = await currentWallet.current.getEthersProvider()
        return await provider.getSigner()
      }
    },
    environment: production
  }

  return (
    <WagmiConfig config={config}>
      <LensProvider config={privyConfig}>
        {children}
      </LensProvider>
    </WagmiConfig>
  )
}

