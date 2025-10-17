"use client"

import { useAuth, useWallets } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react"

interface ConnectWalletButtonProps {
  variant?: "default" | "mobile"
}

export function ConnectWalletButton({ variant = "default" }: ConnectWalletButtonProps) {
  const { ready, authenticated, login, user, linkWallet } = useAuth()
  const { wallets } = useWallets()
  const hasTriggeredLinkWallet = useRef(false)

  useEffect(() => {
    if (authenticated && ready && !hasTriggeredLinkWallet.current) {
      // Check if user has an external wallet (not just the embedded wallet)
      const hasExternalWallet = wallets.some((w) => w.walletClientType !== "embedded")

      if (!hasExternalWallet) {
        hasTriggeredLinkWallet.current = true

        // Give auth modal time to fully close before opening wallet link modal
        setTimeout(async () => {
          try {
            await linkWallet()
          } catch (error) {
            console.error("linkWallet() error:", error)
            hasTriggeredLinkWallet.current = false
          }
        }, 1000)
      }
    }
  }, [authenticated, ready, wallets, linkWallet])

  if (!ready) {
    return (
      <Button
        disabled
        className="bg-black hover:bg-black/80 text-white rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      >
        Loading...
      </Button>
    )
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const displayText = authenticated
    ? user?.email?.address || (wallets[0]?.address ? formatAddress(wallets[0].address) : "Account")
    : "Connect Wallet"

  if (variant === "mobile") {
    return (
      <Button
        onClick={login}
        className="bg-black hover:bg-black/80 text-white rounded-xl border-2 border-black font-bold"
      >
        {displayText}
      </Button>
    )
  }

  return (
    <Button
      onClick={login}
      className="bg-black hover:bg-black/80 text-white rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
    >
      {displayText}
    </Button>
  )
}
