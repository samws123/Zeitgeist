import { defaultWagmiConfig } from "@web3modal/wagmi"
import { mainnet, polygon, arbitrum, base, optimism } from "wagmi/chains"

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo-project-id"

const metadata = {
  name: "ZEITGEIST",
  description: "Social Media Management Platform",
  url: typeof window !== "undefined" ? window.location.origin : "https://ZEITGEIST.app",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
}

// Create wagmiConfig
export const config = defaultWagmiConfig({
  chains: [mainnet, polygon, arbitrum, base, optimism],
  projectId,
  metadata,
})
