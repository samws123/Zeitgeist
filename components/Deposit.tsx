"use client";
import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";
import axios from "axios";

type Props = {
  depositTarget: `0x${string}`;
  chainLabel?: string;
  tokenLabel?: string;
};

export default function Deposit({ depositTarget, chainLabel = "Polygon", tokenLabel = "USDC" }: Props) {
  const [amount, setAmount] = useState<number>(250);
  const [status, setStatus] = useState<string>("");

  const short = (tx: string) => `${tx.slice(0, 6)}…${tx.slice(-4)}`;

  const openMoonPay = async () => {
    try {
      setStatus("Opening MoonPay…");
      const { data } = await axios.get("/api/moonpay/sign", {
        params: {
          walletAddress: depositTarget,
          baseCurrencyCode: "USDC",
          baseCurrencyAmount: amount,
          fiatCurrency: "USD",
        },
      });
      window.open(data.url, "_blank", "noopener,noreferrer");
      setStatus("");
    } catch (e) {
      setStatus("MoonPay failed to open. Try again.");
    }
  };

  const checkOnchain = async () => {
    setStatus("Checking chain for USDC deposit…");
    try {
      const { data } = await axios.get("/api/deposits/check", {
        params: { address: depositTarget },
      });
      if (data?.latest?.found) {
        setStatus(`Confirmed: ${data.latest.amount} USDC (tx ${short(data.latest.tx)})`);
      } else {
        setStatus("No recent deposits detected yet.");
      }
    } catch (e) {
      setStatus("Could not check chain right now.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
        <h3 className="text-xl font-black">Transfer Crypto</h3>
        <p className="text-sm text-gray-600 font-bold">{tokenLabel} • {chainLabel}</p>
        <div className="mt-4 flex items-center gap-4">
          <div className="border-2 border-black rounded-xl p-3 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <QRCodeCanvas value={depositTarget} size={148} />
          </div>
          <div className="space-y-2">
            <div className="font-mono text-xs break-all">{depositTarget}</div>
            <button
              className="px-3 py-1 border-2 border-black rounded-md bg-white text-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              onClick={() => navigator.clipboard.writeText(depositTarget)}
            >
              Copy address
            </button>
            <a
              className="px-3 py-1 border-2 border-black rounded-md bg-white text-black font-bold inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              href={`https://polygonscan.com/address/${depositTarget}`}
              target="_blank"
              rel="noreferrer"
            >
              View on Polygonscan ↗
            </a>
            <button
              className="px-3 py-1 border-2 border-black rounded-md bg-white text-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              onClick={checkOnchain}
            >
              I sent crypto — Check status
            </button>
            <div className="text-sm text-gray-700 font-bold">{status}</div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
        <h3 className="text-xl font-black">Card / PayPal (On‑ramp)</h3>
        <div className="mt-2 flex gap-2 items-center flex-wrap">
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
          <button
            className="ml-auto px-4 py-2 border-2 border-black rounded-md font-black bg-white text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            onClick={openMoonPay}
          >
            Deposit ${amount} via MoonPay
          </button>
        </div>
      </div>
    </div>
  );
}


