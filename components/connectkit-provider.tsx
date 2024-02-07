import { ConnectKitProvider as Provider, getDefaultConfig } from 'connectkit';

import { WagmiConfig, createConfig } from 'wagmi'
import { arbitrum, mainnet } from 'wagmi/chains'

const projectId = process.env.NEXT_PUBLIC_WC_ID || 'test-project-id'

const chains = [mainnet, arbitrum]
const config = createConfig(
  getDefaultConfig({
    chains,
    walletConnectProjectId: projectId,
    appName: "Lens PWA"
  })
)

export function ConnectKitProvider({ children }) {
  return (
    <WagmiConfig config={config}>
      <Provider>
        {children}
      </Provider>
    </WagmiConfig>
  )
}