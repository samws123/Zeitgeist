"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function ConnectPage() {
  const router = useRouter()

  const wallets = [
    { key: "metamask", label: "MetaMask" },
    { key: "coinbase_wallet", label: "Coinbase Wallet" },
    { key: "walletconnect", label: "WalletConnect" },
    { key: "phantom", label: "Phantom (Solana)" },
    { key: "solflare", label: "Solflare (Solana)" },
  ]

  const handleClick = (key: string) => {
    // Placeholder: actual connector wiring will be added next.
    // For now, this page is providing the neobrutalist aesthetic and flow.
    console.log("Connect requested:", key)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 sm:p-6 md:p-10">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/30 border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] backdrop-blur-xl overflow-hidden">
          <div className="border-b-4 border-black p-4 sm:p-6 bg-white/40">
            <h1 className="text-2xl sm:text-3xl font-black">Connect your wallet</h1>
            <p className="text-sm text-gray-700 font-bold mt-1">
              Choose a wallet to continue. You can connect more later in Settings.
            </p>
          </div>

          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {wallets.map((w) => (
                <button
                  key={w.key}
                  onClick={() => handleClick(w.key)}
                  className="w-full text-left px-4 py-3 bg-white border-2 border-black rounded-xl font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  {w.label}
                </button>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <Button
                variant="outline"
                className="rounded-xl border-2 border-black font-bold bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                onClick={() => router.back()}
              >
                Back
              </Button>
              <Button
                className="rounded-xl border-2 border-black font-bold bg-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                onClick={() => router.push("/")}
              >
                Skip for now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


