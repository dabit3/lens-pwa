'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { ModeToggle } from '@/components/dropdown'
import { ChevronRight, Tally3 as IconComponent, LogOut, ArrowBigDownDash } from "lucide-react"
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import {
  useWalletLogin,
  useActiveProfile,
  useWalletLogout
} from '@lens-protocol/react-web'
import { Web3ModalProvider } from "@/components/web3modal-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { LensProvider } from "@/components/lens-provider"
import { useWeb3Modal } from '@web3modal/react'
import { useAccount, useConnect, useDisconnect, useFeeData } from 'wagmi'
import { InjectedConnector } from "wagmi/connectors/injected"

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
        <Web3ModalProvider>
          <LensProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Nav />
              {children}
            </ThemeProvider>
          </LensProvider>
        </Web3ModalProvider>
      </body>
    </html>
  )
}

function Nav() {
  const pathname = usePathname()
  const [isInstalled, setIsInstalled] = useState(true)
  const [isManuallyConnected, setIsManuallyConnected] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>()
  const { execute } = useWalletLogin()
  const { execute: logoutLens } = useWalletLogout()
  const { open, close } = useWeb3Modal()
  const { address, isConnected } = useAccount()
  const { data: wallet } = useActiveProfile()

  const { disconnectAsync, disconnect } = useDisconnect()
  const { connectAsync } = useConnect({
    connector: new InjectedConnector()
  })

  useEffect(() => {
    if (!wallet && address && !isManuallyConnected) {
      loginWithLens()
    }
  }, [address])

  async function loginWithLens() {
    try {
      setIsManuallyConnected(true)
      if (isConnected) {
        await disconnectAsync()
      }
      const { connector } = await connectAsync()
      if (connector instanceof InjectedConnector) {
        const walletClient = await connector.getWalletClient()
        await execute({
          address: walletClient.account.address,
        })
      }
    } catch (err) {
      console.log('error: ', err)
    }
  }

  async function login() {
    try {
      open()
    } catch (err) {
      console.log('error:', err)
      close()
    }
  }

  async function logout() {
    try {
      await logoutLens()
      disconnect()
    } catch (err) {
      console.log('error:', err)
    }
  }

  useEffect(() => {
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
          <p className={`ml-2 mr-4 text-lg font-semibold`}>lenspwa</p>
        </Link>
        <Link href="/" className={`mr-5 text-sm ${pathname !== '/' && 'opacity-50'}`}>
          <p>Home</p>
        </Link>
        <Link href="/search" className={`mr-5 text-sm ${pathname !== '/search' && 'opacity-60'}`}>
          <p>Search</p>
        </Link>
        {
          wallet && (
            <Link href="/profile" className={`mr-5 text-sm ${pathname !== '/search' && 'opacity-60'}`}>
              <p>Profile</p>
            </Link>
          )
        }
      </div>
      <div className='
        flex
        sm:items-center
        pl-4 pb-3 sm:p-0
      '>
        {
          !address && !wallet && (
            <Button onClick={login} variant="secondary" className="mr-2">
              Connect Wallet
              <ChevronRight className="h-4 w-4" />
            </Button>
          )
        }
       {
          !wallet && address && (
            <Button onClick={loginWithLens} variant="secondary" className="mr-2">
              Sign in with Lens
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
          wallet && (
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