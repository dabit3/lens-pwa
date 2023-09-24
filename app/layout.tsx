'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import Link from 'next/link'
import { ModeToggle } from '@/components/dropdown'
import { ChevronRight, Tally3 as IconComponent, LogOut, ArrowBigDownDash } from "lucide-react"
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { usePrivy } from '@privy-io/react-auth'
import { useState, useEffect } from 'react'
// import { useWalletLogin } from '@lens-protocol/react-web';
import { useLogin } from '@privy-io/react-auth';
import { useWallets } from '@privy-io/react-auth'
// import LensProvider from './LensProvider'
import PrivyProvider from './PrivyProvider'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* PWA config */}
      <link rel="manifest" href="/manifest.json" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" /> 
      <meta name="apple-mobile-web-app-title" content="Lens PWA" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/images/icons/iconmain-512x512.png" />
      <meta name="theme-color" content="#000000" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />

      <body className={inter.className}>
        <PrivyProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Nav />
              {children}
            </ThemeProvider>
        </PrivyProvider>
      </body>
    </html>
  )
}

function Nav() {
  const pathname = usePathname()
  const { logout, user } = usePrivy()
  const [isInstalled, setIsInstalled] = useState(true)
  const [deferredPrompt, setDeferredPrompt] = useState<any>()
  // const { execute: loginWithLens } = useWalletLogin()
  const { wallets } = useWallets()

  const { login } = useLogin({
    onComplete: async user => {
      console.log('wallets in useLogin: ', wallets)
      // if (!wallets[0]) return
      if (!user.wallet) return
      console.log('user: ', user)
      // const loggedIn = await loginWithLens({
      //   // address: wallets[0].address,
      //   address: user.wallet?.address
      // })
      // console.log('loggedIn: ', loggedIn)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  })

  useEffect( () => {
    window.addEventListener('beforeinstallprompt', (e) => {
      setIsInstalled(false)
      e.preventDefault()
      setDeferredPrompt(e)
    })
  }, [])

  async function addToHomeScreen() {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true)
      } else {
        console.log('User dismissed the A2HS prompt')
      }
      setDeferredPrompt(null)
    })
  }
  
  return (
    <nav className='
    border-b flex
    flex-col sm:flex-row
    items-start sm:items-center
    sm:pr-10
    '>
      <div
        className='
        sm:px-8
        py-3 px-4 flex flex-1 items-center p'
      >
        <Link href="/" className='mr-5 flex items-center'>
          <IconComponent className="opacity-85" size={19} />
          <p className={`ml-2 mr-4 text-lg font-semibold`}>OnlySubs</p>
        </Link>
        <Link href="/" className={`mr-5 text-sm ${pathname !== '/' && 'opacity-50'}`}>
          <p>Home</p>
        </Link>
        <Link href="/creatorlist" className={`mr-5 text-sm ${pathname !== '/' && 'opacity-50'}`}>
          <p>Creators</p>
        </Link>
        <Link href="/search" className={`mr-5 text-sm ${pathname !== '/search' && 'opacity-60'}`}>
          <p>Search</p>
        </Link>
      </div>
      <div className='
        flex
        sm:items-center
        pl-4 pb-3 sm:p-0
      '>
        {
          !user && (
            <Button onClick={login} variant="secondary" className="mr-2">
              Connect Wallet
              <ChevronRight className="h-4 w-4" />
            </Button>
          )
        }
        {isInstalled ? null : (
          <Button onClick={addToHomeScreen} variant="secondary" className="mr-2">
            Add to Screen
            <ArrowBigDownDash className="h-4 w-4" />
          </Button>
        )}
        {
          user && (
            <Button onClick={logout} variant="secondary" className="mr-4">
            Disconnect
            <LogOut className="h-4 w-4 ml-3" />
          </Button>
          )
        }
        <ModeToggle />
      </div>
    </nav>
  )
}