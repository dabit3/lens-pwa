'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import { Web3ModalProvider } from "@/components/web3modal-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { LensProvider } from "@/components/lens-provider"
import { Nav } from "@/components/nav"

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

