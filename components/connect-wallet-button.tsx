"use client"

import { usePrivy, useWallets, useLogin, useLinkAccount } from "@privy-io/react-auth"
import { Button } from "@/components/ui/button"
import DepositPrompt from "@/components/deposit-prompt"
import { useEffect, useMemo, useRef, useState } from "react"

interface ConnectWalletButtonProps {
  variant?: "default" | "mobile"
}

export function ConnectWalletButton({ variant = "default" }: ConnectWalletButtonProps) {
  const { ready, authenticated, user, linkWallet } = usePrivy()
  const detectedSolana = useMemo(() => {
    if (typeof window === "undefined") return { phantom: false, solflare: false }
    const phantom = !!(window as any)?.phantom?.solana?.isPhantom
    const solflare = !!(window as any)?.solflare?.isSolflare
    return { phantom, solflare }
  }, [])

  const { linkWallet: linkWalletWithCallbacks } = useLinkAccount({
    onSuccess: () => {
      // Any wallet successfully linked → show deposit prompt
      setShowPrompt(true)
    },
  })

  const { login } = useLogin({
    onComplete: ({ wasAlreadyAuthenticated }) => {
      // After email OTP login completes, immediately prompt to link a wallet (keeps Privy modal context)
      if (!wasAlreadyAuthenticated) {
        const solanaEntries: ("phantom" | "solflare")[] = []
        if (detectedSolana.phantom) solanaEntries.push("phantom")
        if (detectedSolana.solflare) solanaEntries.push("solflare")
        linkWalletWithCallbacks({
          walletChainType: "ethereum-and-solana",
          walletList: [
            "detected_ethereum_wallets",
            "detected_solana_wallets",
            "metamask",
            "coinbase_wallet",
            "walletconnect",
            ...solanaEntries,
          ],
        })
      }
    },
  })
  const { wallets } = useWallets()
  const hasTriggeredLinkWallet = useRef(false)
  const hadExternal = useRef<boolean>(false)
  const [showPrompt, setShowPrompt] = useState<boolean>(false)

  useEffect(() => {
    if (authenticated && ready && !hasTriggeredLinkWallet.current) {
      console.log("[v0] User authenticated, checking wallets...", {
        walletsCount: wallets.length,
        walletTypes: wallets.map((w) => w.walletClientType),
      })

      const hasExternalWallet = wallets.some((w) => w.walletClientType !== "privy")
      if (!hadExternal.current && hasExternalWallet) {
        hadExternal.current = true
        setShowPrompt(true)
      }

      if (!hasExternalWallet) {
        hasTriggeredLinkWallet.current = true
        console.log("[v0] No external wallet, calling linkWallet() in 1 second...")

        setTimeout(async () => {
          try {
            console.log("[v0] Calling linkWallet()...")
            await linkWalletWithCallbacks()
            console.log("[v0] linkWallet() completed successfully")
          } catch (error) {
            console.log("[v0] linkWallet() error:", error)
            hasTriggeredLinkWallet.current = false
          }
        }, 1000)
      } else {
        console.log(
          "[v0] External wallet already connected:",
          wallets.map((w) => w.walletClientType),
        )
      }
    }
  }, [authenticated, ready, wallets, linkWallet])

  // Always render an interactive button; Privy modal handles readiness internally

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const emailUsername = user?.email?.address ? user.email.address.split("@")[0] : null
  const displayText = authenticated
    ? emailUsername || (wallets[0]?.address ? formatAddress(wallets[0].address) : "Account")
    : "Connect Wallet"

  if (variant === "mobile") {
    return (
      <Button
        onClick={() => (window.location.href = "/connect")}
        className="bg-black hover:bg-black/80 text-white rounded-xl border-2 border-black font-bold"
      >
        {displayText}
      </Button>
    )
  }

  return (
    <>
      <Button
        onClick={() => (window.location.href = "/connect")}
        className="bg-black hover:bg-black/80 text-white rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      >
        {displayText}
      </Button>
      {showPrompt && (
        <DepositPrompt onClose={() => setShowPrompt(false)} depositTarget={wallets[0]?.address as any} />
      )}
    </>
  )
}
