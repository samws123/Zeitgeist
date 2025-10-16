"use client"
import { useState } from "react"
import axios from "axios"

type Props = {
  onClose: () => void
  depositTarget: `0x${string}` | undefined
}

export default function DepositPrompt({ onClose, depositTarget }: Props) {
  const [amount, setAmount] = useState<number>(250)
  const [busy, setBusy] = useState(false)

  const openMoonPay = async () => {
    if (!depositTarget) return
    try {
      setBusy(true)
      const { data } = await axios.get("/api/moonpay/sign", {
        params: {
          walletAddress: depositTarget,
          baseCurrencyCode: "USDC",
          baseCurrencyAmount: amount,
          fiatCurrency: "USD",
        },
      })
      window.open(data.url, "_blank", "noopener,noreferrer")
      onClose()
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
      <div className="bg-white border-4 border-black rounded-2xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-black">Add funds</h3>
          <button
            onClick={onClose}
            className="px-2 py-1 border-2 border-black rounded-md font-bold bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            Close
          </button>
        </div>
        <p className="text-sm text-gray-600 font-bold mb-4">Choose an amount to deposit now. You can always deposit later.</p>

        <div className="flex gap-2 flex-wrap mb-3">
          {[100, 250, 500, 1000].map((v) => (
            <button
              key={v}
              className={`px-3 py-1 border-2 border-black rounded-md font-bold ${amount === v ? "bg-black text-white" : "bg-white text-black"}`}
              onClick={() => setAmount(v)}
            >
              ${v}
            </button>
          ))}
          <input
            type="number"
            min={10}
            className="border-2 border-black rounded-md px-2 py-1 w-28 font-bold"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>

        <div className="flex gap-3">
          <button
            disabled={!depositTarget || busy}
            onClick={openMoonPay}
            className="px-4 py-2 border-2 border-black rounded-md font-black bg-white text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50"
          >
            Deposit ${amount} via MoonPay
          </button>
          <button
            onClick={() => {
              window.location.href = "/deposit"
            }}
            className="px-4 py-2 border-2 border-black rounded-md font-black bg-white text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            View full deposit options
          </button>
        </div>
      </div>
    </div>
  )
}


