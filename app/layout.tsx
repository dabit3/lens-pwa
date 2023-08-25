'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })
import { ModeToggle } from '@/components/dropdown'
import { ChevronRight, Droplets, LogOut } from "lucide-react"
import LensProvider from './lens-provider'
import { WalletProvider } from './WalletProvider'
import { Button } from '@/components/ui/button'
import { useWeb3Modal } from '@web3modal/react'
import { useAccount } from 'wagmi'
import { disconnect } from '@wagmi/core'
import { usePathname } from 'next/navigation'

function AppWithProviders({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* PWA icons */}
      <link rel="manifest" href="/manifest.json" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" /> 
      <meta name="apple-mobile-web-app-title" content="App Title" />

      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/images/icons/icon-512x512.png" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />

      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Nav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

function Nav() {
  const { open, close, } = useWeb3Modal()
  const { address } = useAccount()
  const pathname = usePathname()

  return (
    <nav className='
    border-b flex
    flex-col sm:flex-row
    items-start sm:items-center
    sm:pr-10
    '>
      <div
        className='py-3 px-8 flex flex-1 items-center p'
      >
        <Link href="/" className='mr-5 flex items-center'>
          <Droplets className="opacity-85" size={19} />
          <p className={`ml-2 mr-4 text-lg font-semibold`}>lenscn</p>
        </Link>
        <Link href="/" className={`mr-5 text-sm ${pathname !== '/' && 'opacity-50'}`}>
          <p>Home</p>
        </Link>
        <Link href="/search" className={`mr-5 text-sm ${pathname !== '/search' && 'opacity-60'}`}>
          <p>Search</p>
        </Link>
      </div>
      <div className='
        flex
        sm:items-center
        pl-8 pb-3 sm:p-0
      '>
        {
          !address && (
            <Button onClick={open} variant="secondary" className="mr-4">
          Sign In
          <ChevronRight className="h-4 w-4" />
        </Button>
          )
        }
        {
          address && (
            <Button onClick={disconnect} variant="secondary" className="mr-4">
            Sign out
            <LogOut className="h-4 w-4 ml-3" />
          </Button>
          )
        }
        <ModeToggle />
      </div>
    </nav>
  )
}

export default function RootLayout({ children, ...props }) {
  return (
    <LensProvider>
        <AppWithProviders {...props}>
          <WalletProvider>
          {children}
          </WalletProvider>
        </AppWithProviders>
    </LensProvider>
  )
}