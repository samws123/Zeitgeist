"use client"

import type React from "react"

import { PrivyProvider } from "@privy-io/react-auth"
import { polygon } from "viem/chains"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
      config={{
        loginMethods: ["google", "apple", "email", "wallet"],
        walletConnectors: ["metamask", "coinbase_wallet", "walletconnect", "phantom", "solflare"],
        embeddedWallets: {
          createOnLogin: "all-users",
        },
        defaultChain: polygon,
        supportedChains: [polygon],
        appearance: {
          theme: "light",
          accentColor: "#000000",
          logo: undefined,
          landingHeader: "ZEITGEIST",
          showWalletLoginFirst: false,
        },
      }}
    >
      {children}
    </PrivyProvider>
  )
}
