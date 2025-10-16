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
          logo: undefined,
          landingHeader: "ZEITGEIST",
          loginMessage: "Sign in with email or socials, then connect your wallet",
          showWalletLoginFirst: false,
          walletChainType: "ethereum-and-solana",
          walletList: [
            "detected_wallets",
            "detected_ethereum_wallets",
            "detected_solana_wallets",
            "metamask",
            "coinbase_wallet",
            "walletconnect",
            "rainbow",
            "zerion",
            "okx_wallet",
            "rabby_wallet",
            "uniswap",
            "safe",
          ],
        },
      }}
    >
      {children}
    </PrivyProvider>
  )
}
