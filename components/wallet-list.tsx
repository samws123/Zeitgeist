"use client"

import { usePrivy, useWallets } from "@privy-io/react-auth"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, ExternalLink } from "lucide-react"

const WALLET_NAMES = ["Chopper", "Maverick", "Nova", "Viper", "Orion", "Rogue", "Echo", "Falcon", "Atlas", "Comet"]

export function WalletList() {
  const { ready, authenticated, linkWallet } = usePrivy()
  const { wallets } = useWallets()
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)

  if (!ready || !authenticated) {
    return null
  }

  const handleCopyAddress = async (address: string) => {
    await navigator.clipboard.writeText(address)
    setCopiedAddress(address)
    setTimeout(() => setCopiedAddress(null), 2000)
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const getPolygonscanUrl = (address: string) => {
    return `https://polygonscan.com/address/${address}`
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-black">Your Wallets</h3>
        <Button
          onClick={() =>
            linkWallet({
              walletChainType: "ethereum-and-solana",
              walletList: [
                "detected_ethereum_wallets",
                "detected_solana_wallets",
                "metamask",
                "coinbase_wallet",
                "walletconnect",
              ],
            })
          }
          className="bg-black text-white hover:bg-gray-800 font-bold rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
        >
          Link Wallet
        </Button>
      </div>

      <div className="space-y-3">
        {wallets.map((wallet, index) => {
          const walletName = WALLET_NAMES[index % WALLET_NAMES.length]
          const isCopied = copiedAddress === wallet.address

          return (
            <div
              key={wallet.address}
              className="bg-white border-2 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-black text-lg mb-1">{walletName}</div>
                  <button
                    onClick={() => handleCopyAddress(wallet.address)}
                    className="text-sm font-bold text-gray-600 hover:text-black transition-colors flex items-center gap-1"
                    title="Click to copy address"
                  >
                    @{formatAddress(wallet.address)}
                    <Copy className="w-3 h-3" />
                  </button>
                  {isCopied && <span className="text-xs text-green-600 font-bold ml-2">Copied!</span>}
                </div>

                <a
                  href={getPolygonscanUrl(wallet.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Polygonscan
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {wallet.walletClientType === "privy" && (
                <div className="mt-2 text-xs font-bold text-gray-500">Embedded Wallet</div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
