"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react"
import { ConnectWalletButton } from "@/components/connect-wallet-button"
import { useState } from "react"
import SettingsModal from "@/components/settings-modal"

export default function MobileNavigation() {
  const [showSettingsModal, setShowSettingsModal] = useState(false)

  return (
    <>
      <SettingsModal isOpen={showSettingsModal} onClose={() => setShowSettingsModal(false)} />

      <div className="h-full bg-white/40 backdrop-blur-md flex flex-col">
        <div className="p-6 border-b-4 border-black">
          <h2 className="text-2xl font-black">ZEITGEIST</h2>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <nav className="space-y-2 mb-8">
            <Link href="#" className="flex items-center gap-2 text-lg font-bold p-3 bg-black text-white rounded-xl">
              Dashboard
            </Link>
            <Link href="#" className="flex items-center gap-2 text-lg font-bold p-3 hover:bg-black/10 rounded-xl">
              Traders
            </Link>
            <Link href="#" className="flex items-center gap-2 text-lg font-bold p-3 hover:bg-black/10 rounded-xl">
              Docs
            </Link>
            <Link href="#" className="flex items-center gap-2 text-lg font-bold p-3 hover:bg-black/10 rounded-xl">
              Support
            </Link>
          </nav>

          <div>
            <h2 className="text-xl font-black mb-4">PLATFORMS</h2>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start gap-2 rounded-xl border-2 border-black font-bold bg-transparent"
              >
                <Instagram className="h-5 w-5" /> Instagram
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 rounded-xl border-2 border-black font-bold bg-transparent"
              >
                <Twitter className="h-5 w-5" /> Twitter
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 rounded-xl border-2 border-black font-bold bg-transparent"
              >
                <Linkedin className="h-5 w-5" /> LinkedIn
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 rounded-xl border-2 border-black font-bold bg-transparent"
              >
                <Youtube className="h-5 w-5" /> YouTube
              </Button>
            </div>
          </div>
        </div>

        <div className="p-4 border-t-4 border-black">
          <div className="grid grid-cols-2 gap-2">
            <ConnectWalletButton variant="mobile" />
            <Button
              onClick={() => setShowSettingsModal(true)}
              variant="outline"
              className="rounded-xl border-2 border-black font-bold bg-transparent"
            >
              Settings
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
