'use client'

import { PrivyProvider } from '@privy-io/react-auth'
import {foundry, localhost} from '@wagmi/chains';


export default function Provider({
  children
}) {
    return (
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
        config={{
          loginMethods: ['email', 'wallet', 'google', 'apple'],
          appearance: {
            theme: 'dark',
            accentColor: '#676FFF',
            logo: 'https://i.imgur.com/tzKMWv9.png',
          },
          embeddedWallets: {
            createOnLogin: 'all-users',
            noPromptOnSignature: false
          },
          // rpcConfig: {
          //   rpcUrls: {
          //     1337 : "http://127.0.0.1:8545",
          // }
          // },
          additionalChains: [foundry, localhost]
        }}>
           {children}
      </PrivyProvider>
    )
}