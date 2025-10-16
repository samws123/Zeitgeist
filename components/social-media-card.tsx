"use client"

import type React from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Check, Copy, ExternalLink } from "lucide-react"

interface SocialMediaCardProps {
  platform: string
  username: string
  icon: React.ReactNode
  color: string
  onSelect?: () => void
  traderAvatar?: string
}

export default function SocialMediaCard({
  platform,
  username,
  icon,
  color,
  onSelect,
  traderAvatar,
}: SocialMediaCardProps) {
  const [copied, setCopied] = useState(false)

  const rawAddress = username.replace("@", "").trim()
  const isEvm = rawAddress.startsWith("0x")
  const explorerUrl = isEvm
    ? `https://polygonscan.com/address/${rawAddress}`
    : `https://solscan.io/account/${rawAddress}`

  const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(rawAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card
      className="border-4 border-black rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all"
      onClick={onSelect}
    >
      <div className={cn("p-4 text-white", color)}>
        <div className="flex justify-between items-center">
          {traderAvatar ? (
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white flex items-center justify-center text-2xl">
              {traderAvatar}
            </div>
          ) : (
            icon
          )}
          <span className="text-xs font-bold bg-gray-400 text-white px-2 py-1 rounded-full">Live</span>
        </div>
        <h3 className="text-xl font-bold mt-2">{platform}</h3>
        <div className="mt-1 flex items-center gap-2 text-sm opacity-90 hover:opacity-100 transition-opacity">
          <a
            href={explorerUrl}
            onClick={(e) => e.stopPropagation()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1"
            title="View on explorer"
          >
            @{formatAddress(rawAddress)}
            <ExternalLink className="h-3 w-3" />
          </a>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1 px-1 py-[2px] border-2 border-black rounded-md bg-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            title="Copy address"
            aria-label="Copy address"
          >
            <Copy className="h-3 w-3" />
          </button>
          {copied && <Check className="h-3 w-3" />}
        </div>
      </div>
      <div className="p-4 bg-white">
        <div className="flex justify-between text-sm">
          <div>
            <p className="font-bold">1,234</p>
            <p className="text-gray-600">Trades</p>
          </div>
          <div>
            <p className="font-bold">56</p>
            <p className="text-gray-600">Active</p>
          </div>
          <div>
            <p className="font-bold text-green-600">+$1,100 (7.4%)</p>
            <p className="text-gray-600">Performance</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
