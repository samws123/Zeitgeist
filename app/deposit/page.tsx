"use client";
import Deposit from "@/components/Deposit";
import { usePrivy, useWallets } from "@privy-io/react-auth";

export default function DepositPage() {
  const { ready, authenticated, linkWallet } = usePrivy();
  const { wallets } = useWallets();
  const eoa = wallets[0]?.address as `0x${string}` | undefined;

  if (!ready) return null;

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-black mb-2">Add Funds</h1>
      <p className="text-sm text-gray-600 font-bold mb-6">
        Funds go directly to your self‑custody wallet on Polygon.
      </p>
      {authenticated && eoa ? (
        <Deposit depositTarget={eoa} />
      ) : (
        <div className="rounded-2xl border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
          <p className="font-bold mb-4">Link a wallet to get your deposit address.</p>
          <button
            className="px-4 py-2 border-2 border-black rounded-md font-black bg-white text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
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
          >
            Link Wallet
          </button>
        </div>
      )}
    </main>
  );
}


