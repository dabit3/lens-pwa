'use client'

import { MyContextProvider } from '@/context/appcontext';
import { PrivyProvider } from '@privy-io/react-auth'
import {foundry, localhost, baseGoerli} from '@wagmi/chains';


export default function Provider({
  children
}) {
    return (
      <MyContextProvider>
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
        config={{
          loginMethods: ['email', 'wallet', 'google', 'apple'],
          appearance: {
            theme: 'dark',
            accentColor: '#676FFF',
            logo: '/images/OnlySubs.jpg',
          },
          embeddedWallets: {
            createOnLogin: 'all-users',
            noPromptOnSignature: false
          },
          additionalChains: [foundry, localhost, baseGoerli]
        }}>
           {children}
      </PrivyProvider>
      </MyContextProvider>
    )
}