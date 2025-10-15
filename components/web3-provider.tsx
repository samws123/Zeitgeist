"use client"

import { createWeb3Modal } from "@web3modal/wagmi/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider } from "wagmi"
import { config, projectId } from "@/lib/web3-config"
import type { ReactNode } from "react"

// Setup queryClient
const queryClient = new QueryClient()

// Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  themeMode: "light",
  themeVariables: {
    "--w3m-accent": "#000000",
    "--w3m-border-radius-master": "12px",
  },
})

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
