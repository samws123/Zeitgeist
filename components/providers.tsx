"use client"

import type React from "react"
import { AuthProvider } from "@/lib/auth-context"
import { Web3Provider } from "@/components/web3-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Web3Provider>
      <AuthProvider>{children}</AuthProvider>
    </Web3Provider>
  )
}
