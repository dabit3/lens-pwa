"use client"
import { polygonMumbai, polygon } from "wagmi/chains"
import { configureChains, createConfig, WagmiConfig } from "wagmi"
import { publicProvider } from "wagmi/providers/public"
import { InjectedConnector } from "wagmi/connectors/injected"
import { LensProvider as Provider, LensConfig, production } from "@lens-protocol/react-web"
import { bindings as wagmiBindings } from "@lens-protocol/wagmi"

const { publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai, polygon],
  [publicProvider()]
)

const config = createConfig({
  autoConnect: false,
  publicClient,
  webSocketPublicClient,
  connectors: [
    new InjectedConnector({
      options: {
        shimDisconnect: false,
      },
    }),
  ],
})

const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: production,
}

export function LensProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <WagmiConfig config={config}>
      <Provider config={lensConfig}>
        {children}
      </Provider>
    </WagmiConfig>
  )
}

