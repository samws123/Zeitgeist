"use client"

import { usePrivy } from "@privy-io/react-auth"
import { Button } from "@/components/ui/button"
import { X, LogOut, Trash2, DollarSign } from "lucide-react"
import { WalletList } from "@/components/wallet-list"

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { user, logout } = usePrivy()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white border-4 border-black rounded-2xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-6 w-full max-w-md relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 border-2 border-black rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        >
          <X className="h-4 w-4 text-white" />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-black mb-2">Settings</h2>
          <p className="text-sm text-gray-600 font-bold">{user?.email?.address || "Manage your account"}</p>
        </div>

        <div className="mb-6">
          <WalletList />
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start rounded-xl border-2 border-black font-bold bg-transparent shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            <DollarSign className="h-4 w-4 mr-2" />
            Withdraw Funds
          </Button>

          <Button
            onClick={() => {
              logout()
              onClose()
            }}
            variant="outline"
            className="w-full justify-start rounded-xl border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start rounded-xl border-2 border-red-500 font-bold text-red-600 hover:bg-red-50 bg-transparent shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  )
}
