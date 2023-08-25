"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [isClient, setIsClient] = React.useState(false)
  React.useEffect(() => {
    setIsClient(true);
  }, [])
  return (
    <>
      {isClient ? (
        <NextThemesProvider {...props}>{children}</NextThemesProvider>
      ) : (
        <></>
      )}
    </>
  )
}
