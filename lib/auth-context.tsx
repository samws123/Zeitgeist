"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAccount, useConnect, useDisconnect } from "wagmi"

interface User {
  email?: {
    address: string
  }
  wallets: Wallet[]
}

interface Wallet {
  address: string
  walletClientType: string
  chainId?: number
}

interface AuthContextType {
  ready: boolean
  authenticated: boolean
  user: User | null
  login: () => void
  logout: () => void
  linkWallet: () => void
  wallets: Wallet[]
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  useEffect(() => {
    // Simulate ready state
    const timer = setTimeout(() => setReady(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem("zeitgeist_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  useEffect(() => {
    // Update user wallets when wallet connects
    if (isConnected && address && user) {
      const walletExists = user.wallets.some((w) => w.address === address)
      if (!walletExists) {
        const updatedUser = {
          ...user,
          wallets: [
            ...user.wallets,
            {
              address,
              walletClientType: "external",
              chainId: 137, // Polygon
            },
          ],
        }
        setUser(updatedUser)
        localStorage.setItem("zeitgeist_user", JSON.stringify(updatedUser))
      }
    }
  }, [isConnected, address, user])

  const login = () => {
    setShowAuthModal(true)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("zeitgeist_user")
    disconnect()
  }

  const linkWallet = () => {
    setShowWalletModal(true)
  }

  const wallets = user?.wallets || []

  return (
    <AuthContext.Provider
      value={{
        ready,
        authenticated: !!user,
        user,
        login,
        logout,
        linkWallet,
        wallets,
      }}
    >
      {children}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onSuccess={(userData) => {
            setUser(userData)
            localStorage.setItem("zeitgeist_user", JSON.stringify(userData))
            setShowAuthModal(false)
          }}
        />
      )}
      {showWalletModal && <WalletModal onClose={() => setShowWalletModal(false)} />}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function useWallets() {
  const { wallets } = useAuth()
  return { wallets }
}

// Auth Modal Component
function AuthModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: (user: User) => void }) {
  const [view, setView] = useState<"auth" | "verify" | "kalshi-keys">("auth")
  const [email, setEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""])
  const [isResending, setIsResending] = useState(false)
  const [kalshiKeyId, setKalshiKeyId] = useState("")
  const [kalshiPrivateKey, setKalshiPrivateKey] = useState("")

  const handleEmailSignup = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setView("verify")
    }
  }

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newCode = [...verificationCode]
    newCode[index] = value
    setVerificationCode(newCode)

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-input-${index + 1}`)
      nextInput?.focus()
    }

    if (newCode.every((digit) => digit !== "") && index === 5) {
      handleVerify(newCode.join(""))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-input-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleVerify = (code: string) => {
    if (code.length === 6) {
      setView("kalshi-keys")
    }
  }

  const handleResend = () => {
    setIsResending(true)
    setTimeout(() => {
      setIsResending(false)
      setVerificationCode(["", "", "", "", "", ""])
      document.getElementById("code-input-0")?.focus()
    }, 1000)
  }

  const handleKalshiSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newUser: User = {
      email: { address: email },
      wallets: [
        {
          address: `0x${Math.random().toString(16).slice(2, 42)}`,
          walletClientType: "embedded",
        },
      ],
    }
    localStorage.setItem("kalshi_key_id", kalshiKeyId)
    localStorage.setItem("kalshi_private_key", kalshiPrivateKey)
    onSuccess(newUser)
  }

  const handleSocialAuth = (provider: string) => {
    const newUser: User = {
      email: { address: `user@${provider}.com` },
      wallets: [
        {
          address: `0x${Math.random().toString(16).slice(2, 42)}`,
          walletClientType: "embedded",
        },
      ],
    }
    onSuccess(newUser)
  }

  if (view === "kalshi-keys") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="bg-white border-4 border-black rounded-2xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 w-full max-w-md relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
          <button
            onClick={() => setView("verify")}
            className="absolute top-4 left-4 w-10 h-10 bg-white border-2 border-black rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="Back"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white border-2 border-black rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors font-black text-2xl leading-none"
            aria-label="Close"
          >
            ×
          </button>

          <div className="mt-12 mb-6">
            <h2 className="text-3xl font-black mb-4 tracking-tight text-center">Connect Kalshi</h2>
            <p className="text-gray-600 font-medium text-center mb-6">
              Get your API keys from your{" "}
              <a
                href="https://kalshi.com/account/profile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 font-bold hover:text-purple-700 underline"
              >
                Kalshi profile
              </a>
            </p>

            {/* Instructional Video */}
            <div className="mb-6 border-4 border-black rounded-xl overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="mb-2"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <p className="font-bold">Tutorial Video</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleKalshiSubmit} className="space-y-4">
            <div>
              <label htmlFor="kalshi-key-id" className="block text-sm font-bold mb-2">
                Kalshi API Key ID
              </label>
              <input
                id="kalshi-key-id"
                type="text"
                value={kalshiKeyId}
                onChange={(e) => setKalshiKeyId(e.target.value)}
                placeholder="Enter your Kalshi API Key ID"
                className="w-full px-4 py-3 border-2 border-black rounded-xl font-medium text-base focus:outline-none focus:ring-4 focus:ring-purple-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] placeholder:text-gray-400"
                required
              />
            </div>

            <div>
              <label htmlFor="kalshi-private-key" className="block text-sm font-bold mb-2">
                Kalshi Private Key
              </label>
              <textarea
                id="kalshi-private-key"
                value={kalshiPrivateKey}
                onChange={(e) => setKalshiPrivateKey(e.target.value)}
                placeholder="Enter your Kalshi Private Key"
                rows={4}
                className="w-full px-4 py-3 border-2 border-black rounded-xl font-medium text-base focus:outline-none focus:ring-4 focus:ring-purple-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] placeholder:text-gray-400 resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-500 text-white border-4 border-black py-4 rounded-xl font-black text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              CONNECT
            </button>
          </form>
        </div>
      </div>
    )
  }

  if (view === "verify") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="bg-white border-4 border-black rounded-2xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 w-full max-w-md relative animate-in zoom-in-95 duration-200">
          <button
            onClick={() => setView("auth")}
            className="absolute top-4 left-4 w-10 h-10 bg-white border-2 border-black rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="Back"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white border-2 border-black rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors font-black text-2xl leading-none"
            aria-label="Close"
          >
            ×
          </button>

          <div className="flex justify-center mb-6 mt-8">
            <div className="w-24 h-24 bg-purple-100 border-4 border-black rounded-full flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-purple-600"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-black mb-4 tracking-tight">Enter confirmation code</h2>
            <p className="text-gray-600 font-medium text-balance">
              Please check <span className="font-bold text-black">{email}</span> for an email from zeitgeist.io and
              enter your code below.
            </p>
          </div>

          <div className="flex gap-2 justify-center mb-8">
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                id={`code-input-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-14 h-14 border-4 border-black rounded-xl text-center text-2xl font-black focus:outline-none focus:ring-4 focus:ring-purple-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                autoFocus={index === 0}
              />
            ))}
          </div>

          <div className="text-center">
            <span className="text-gray-600 font-medium">Didn't get an email? </span>
            <button
              onClick={handleResend}
              disabled={isResending}
              className="text-blue-600 font-bold hover:text-blue-700 disabled:opacity-50"
            >
              {isResending ? "Sending..." : "Resend code"}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white border-4 border-black rounded-2xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 w-full max-w-md relative animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-white border-2 border-black rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors font-black text-2xl leading-none"
          aria-label="Close"
        >
          ×
        </button>

        <div className="text-center mb-8">
          <h2 className="text-4xl font-black mb-3 tracking-tight">ZEITGEIST</h2>
          <p className="text-gray-600 font-medium">Sign in with email or socials</p>
        </div>

        <form onSubmit={handleEmailSignup} className="mb-4">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full pl-14 pr-28 py-4 border-2 border-black rounded-xl font-medium text-base focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-400"
              required
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-white text-gray-400 font-bold rounded-lg hover:text-black hover:bg-gray-50 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>

        <div className="space-y-3">
          <button
            onClick={() => handleSocialAuth("google")}
            className="w-full bg-white border-2 border-black py-4 rounded-xl font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-start gap-4 px-6"
          >
            <div className="w-6 h-6 flex-shrink-0">
              <svg viewBox="0 0 48 48" width="24" height="24">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
                <path fill="none" d="M0 0h48v48H0z" />
              </svg>
            </div>
            <span className="text-base">Google</span>
          </button>

          <button
            onClick={() => handleSocialAuth("apple")}
            className="w-full bg-white border-2 border-black py-4 rounded-xl font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-start gap-4 px-6"
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
            </div>
            <span className="text-base">Apple</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// Wallet Modal Component
function WalletModal({ onClose }: { onClose: () => void }) {
  const { connect, connectors } = useConnect()

  const handleConnect = (connector: any) => {
    connect({ connector })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white border-4 border-black rounded-2xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 w-full max-w-md relative animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-10 h-10 bg-red-500 border-4 border-black rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-white text-xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-black mb-6">LINK WALLET</h2>

        <div className="space-y-3">
          {connectors.map((connector) => (
            <button
              key={connector.id}
              onClick={() => handleConnect(connector)}
              className="w-full bg-white border-2 border-black py-3 rounded-xl font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              {connector.name.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
