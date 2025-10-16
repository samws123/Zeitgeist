"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Instagram,
  Linkedin,
  Menu,
  Plus,
  Twitter,
  Youtube,
  ArrowLeft,
  CheckCircle2,
  Search,
  ChevronDown,
  X,
  TrendingUp,
} from "lucide-react"
import SocialMediaCard from "@/components/social-media-card"
import MobileNavigation from "@/components/mobile-navigation"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ConnectWalletButton } from "@/components/connect-wallet-button"
import { Input } from "@/components/ui/input"
import { Tabs as TraderTabs, TabsList as TraderTabsList, TabsTrigger as TraderTabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import SettingsModal from "@/components/settings-modal"
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"

export default function Dashboard() {
  const [selectedTrader, setSelectedTrader] = useState<string | null>(null)
  const [currentView, setCurrentView] = useState<"dashboard" | "traders" | "docs">("dashboard")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [showBudgetModal, setShowBudgetModal] = useState(false)
  const [budgetAmount, setBudgetAmount] = useState("")
  const [selectedTraderForBudget, setSelectedTraderForBudget] = useState<any>(null)
  const [viewingFromLeaderboard, setViewingFromLeaderboard] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [portfolioTimePeriod, setPortfolioTimePeriod] = useState<"1D" | "1W" | "1M" | "ALL">("ALL")
  const [selectedPlatform, setSelectedPlatform] = useState<"polymarket" | "kalshi">("polymarket")

  const handleCopyClick = (trader: any) => {
    setSelectedTraderForBudget(trader)
    setShowBudgetModal(true)
  }

  const handleBudgetSubmit = () => {
    if (budgetAmount) {
      // Here you would save the budget allocation
      console.log(`Allocated $${budgetAmount} to ${selectedTraderForBudget.name}`)
      setShowBudgetModal(false)
      setBudgetAmount("")
      setSelectedTraderForBudget(null)
      if (viewingFromLeaderboard) {
        setSelectedTrader(selectedTraderForBudget.id.toString())
        setCurrentView("traders")
        setViewingFromLeaderboard(false)
      } else {
        setCurrentView("dashboard")
      }
    }
  }

  const trades = [
    {
      id: 1,
      result: "Won",
      market: "Blue Jays vs. Yankees",
      details: "829,483.2 Blue Jays at 40¢",
      totalBet: "$331,793.28",
      amountWon: "$829,483.19",
      profit: "$497,689.91 (150%)",
      icon: "⚾",
    },
    {
      id: 2,
      result: "Won",
      market: "Lions vs. Chiefs",
      details: "1,000,799.7 Chiefs at 57¢",
      totalBet: "$570,455.82",
      amountWon: "$1,000,799.68",
      profit: "$430,343.86 (75.44%)",
      icon: "🏈",
    },
    {
      id: 3,
      result: "Won",
      market: "Eagles vs. Giants",
      details: "499,999.9 Giants at 22¢",
      totalBet: "$109,999.98",
      amountWon: "$499,999.92",
      profit: "$389,999.94 (354.55%)",
      icon: "🏈",
    },
    {
      id: 4,
      result: "Won",
      market: "Spread: Broncos (-7.5)",
      details: "632,802.6 Jets at 55¢",
      totalBet: "$348,041.44",
      amountWon: "$632,802.63",
      profit: "$284,761.18 (81.82%)",
      icon: "🏈",
    },
  ]

  const topTraders = [
    {
      id: 1,
      rank: 1,
      name: "Chopper",
      avatar: "🏆",
      profitLoss: "+$1,320,241",
      volume: "$10,819,700",
      isCopying: false,
      platform: "polymarket" as const,
    },
    {
      id: 2,
      rank: 2,
      name: "WhaleKing",
      avatar: "🐋",
      profitLoss: "+$1,117,526",
      volume: "$12,270,277",
      isCopying: true,
      platform: "polymarket" as const,
    },
    {
      id: 3,
      rank: 3,
      name: "DiamondHands",
      avatar: "💎",
      profitLoss: "+$803,251",
      volume: "$8,293,004",
      isCopying: false,
      platform: "kalshi" as const,
    },
    {
      id: 4,
      rank: 4,
      name: "kch123",
      avatar: "💎",
      profitLoss: "+$697,323",
      volume: "$3,824,034",
      isCopying: false,
      platform: "kalshi" as const,
    },
    {
      id: 5,
      rank: 5,
      name: "XiXi95",
      avatar: "🚀",
      profitLoss: "+$671,323",
      volume: "$1,100,530",
      isCopying: true,
      platform: "polymarket" as const,
    },
  ]

  const filteredTraders = topTraders.filter((trader) => trader.platform === selectedPlatform)

  const categories = [
    "All Categories",
    "Politics",
    "Sports",
    "Crypto",
    "Culture",
    "Mentions",
    "Weather",
    "Economics",
    "Tech",
  ]

  const portfolioData = [
    { time: "Jan 1", value: 10000 },
    { time: "Jan 8", value: 10500 },
    { time: "Jan 15", value: 11200 },
    { time: "Jan 22", value: 11800 },
    { time: "Jan 29", value: 12100 },
    { time: "Feb 5", value: 13200 },
    { time: "Feb 12", value: 12800 },
    { time: "Feb 19", value: 14100 },
    { time: "Feb 26", value: 15300 },
    { time: "Mar 5", value: 16200 },
    { time: "Mar 12", value: 17800 },
    { time: "Mar 19", value: 18900 },
  ]

  const currentPortfolioValue = portfolioData[portfolioData.length - 1].value
  const initialValue = portfolioData[0].value
  const profitAmount = currentPortfolioValue - initialValue
  const profitPercentage = ((profitAmount / initialValue) * 100).toFixed(2)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-2 sm:p-4 md:p-8">
      <SettingsModal isOpen={showSettingsModal} onClose={() => setShowSettingsModal(false)} />

      {showBudgetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white border-4 border-black rounded-2xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-6 w-[280px] relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => {
                setShowBudgetModal(false)
                setBudgetAmount("")
              }}
              className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 border-2 border-black rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              <X className="h-4 w-4 text-white" />
            </button>

            <div className="text-center mb-6">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="text-xl font-black mb-2">Set Budget</h3>
              <p className="text-sm text-gray-600 font-bold">
                How much do you want to copy trade {selectedTraderForBudget?.name} with?
              </p>
            </div>

            <div className="mb-6">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-black">$</span>
                <Input
                  type="number"
                  value={budgetAmount}
                  onChange={(e) => setBudgetAmount(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleBudgetSubmit()
                    }
                  }}
                  placeholder="0"
                  className="pl-8 text-center text-2xl font-black border-2 border-black rounded-xl h-14 bg-white"
                  autoFocus
                />
              </div>
            </div>

            <Button
              onClick={handleBudgetSubmit}
              disabled={!budgetAmount || Number(budgetAmount) <= 0}
              className="w-full bg-black text-white hover:bg-gray-800 font-black text-lg rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed h-12"
            >
              Go
            </Button>
          </div>
        </div>
      )}

      {/* Glassmorphic container */}
      <div className="w-full max-w-7xl mx-auto backdrop-blur-xl bg-white/30 border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative">
        {/* Header */}
        <header className="border-b-4 border-black p-4 sm:p-6 bg-white/40 backdrop-blur-md">
          <div className="flex justify-between items-center gap-4 relative">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">ZEITGEIST</h1>

            <span className="hidden lg:block absolute left-1/2 -translate-x-1/2 text-xs sm:text-sm font-bold bg-white px-4 py-1 border-2 border-black rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              Copy Trade Polymarket's Most Profitable Whales for Free
            </span>

            {/* Mobile menu */}
            <div className="flex md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-xl border-2 border-black bg-transparent">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="border-r-4 border-black p-0">
                  <MobileNavigation />
                </SheetContent>
              </Sheet>
            </div>

            {/* Desktop buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <ConnectWalletButton />
              <Button
                onClick={() => setShowSettingsModal(true)}
                variant="outline"
                className="rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-transparent"
              >
                Settings
              </Button>
            </div>
          </div>
        </header>

        <div className="grid md:grid-cols-[280px_1fr] h-[calc(100vh-6rem)]">
          {/* Sidebar - Desktop only */}
          <div className="hidden md:block border-r-4 border-black bg-white/40 p-4">
            <nav className="space-y-2">
              <button
                onClick={() => {
                  setCurrentView("dashboard")
                  setSelectedTrader(null)
                }}
                className={`w-full text-left flex items-center gap-2 text-lg font-bold p-3 rounded-xl ${
                  currentView === "dashboard" ? "bg-black text-white" : "hover:bg-black/10"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentView("traders")}
                className={`w-full text-left flex items-center gap-2 text-lg font-bold p-3 rounded-xl ${
                  currentView === "traders" ? "bg-black text-white" : "hover:bg-black/10"
                }`}
              >
                Traders
              </button>
              <button
                onClick={() => setCurrentView("docs")}
                className={`w-full text-left flex items-center gap-2 text-lg font-bold p-3 rounded-xl ${
                  currentView === "docs" ? "bg-black text-white" : "hover:bg-black/10"
                }`}
              >
                Docs
              </button>
              <Link href="#" className="flex items-center gap-2 text-lg font-bold p-3 hover:bg-black/10 rounded-xl">
                Support
              </Link>
            </nav>

            <div className="mt-8">
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

          {/* Main content */}
          <div className="overflow-auto p-4 sm:p-6">
            {currentView === "docs" ? (
              // Docs View
              <div className="max-w-4xl">
                <h2 className="text-3xl sm:text-4xl font-black mb-8">Documentation</h2>

                {/* Fee Structure Section */}
                <div className="bg-white border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 mb-6">
                  <h3 className="text-2xl font-black mb-4 flex items-center gap-2">
                    <span className="text-3xl">💰</span>
                    Fee Structure
                  </h3>
                  <div className="space-y-4">
                    <p className="text-lg font-bold leading-relaxed">
                      We take{" "}
                      <span className="bg-yellow-200 px-2 py-1 border-2 border-black rounded">
                        5% of all winning trades
                      </span>
                      .
                    </p>
                    <p className="text-base leading-relaxed">
                      In this way we do not profit off of your losses, and{" "}
                      <span className="underline font-bold">it's our sincerest interest to see you win</span>.
                    </p>
                  </div>
                </div>

                {/* Proportional Trade Sizing Section */}
                <div className="bg-white border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
                  <h3 className="text-2xl font-black mb-4 flex items-center gap-2">
                    <span className="text-3xl">⚖️</span>
                    Proportional Trade Sizing
                  </h3>
                  <div className="space-y-4">
                    <p className="text-base leading-relaxed">
                      Our bot will automatically take into account the size you've allocated to each strategy to make
                      sure the size of each trade is proportional to what the trader is making on their account. In this
                      way we follow the same <span className="underline font-bold">embedded risk management</span>{" "}
                      strategies that they do.
                    </p>
                  </div>
                </div>
              </div>
            ) : currentView === "traders" ? (
              // Traders Leaderboard View
              <div>
                {selectedTrader ? (
                  // Trader detail view from leaderboard
                  <div>
                    {/* Back button and trader info header */}
                    <div className="mb-6">
                      <Button
                        variant="ghost"
                        onClick={() => setSelectedTrader(null)}
                        className="mb-4 font-bold hover:bg-black/10 rounded-xl"
                      >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Back
                      </Button>

                      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-2xl">
                            {topTraders.find((t) => t.id.toString() === selectedTrader)?.avatar || "👤"}
                          </div>
                          <div>
                            <h3 className="text-2xl font-black">
                              {topTraders.find((t) => t.id.toString() === selectedTrader)?.name || "Trader Name"}
                            </h3>
                            <p className="text-gray-600 font-bold">@tradertag</p>
                          </div>
                        </div>

                        <Button className="bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                          Stop Copying
                        </Button>
                      </div>

                      {/* Stats cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white border-4 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                          <p className="text-sm text-gray-600 font-bold mb-1">Copying Since</p>
                          <p className="text-xl font-black">Jan 15, 2025</p>
                        </div>
                        <div className="bg-white border-4 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                          <p className="text-sm text-gray-600 font-bold mb-1">Aggregate Performance</p>
                          <p className="text-xl font-black text-green-600">+127.5%</p>
                        </div>
                        <button className="bg-white border-4 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all text-left">
                          <p className="text-sm text-gray-600 font-bold mb-1">Budget</p>
                          <p className="text-xl font-black">$10,000</p>
                          <p className="text-xs text-blue-600 font-bold mt-1">Click to adjust →</p>
                        </button>
                      </div>
                    </div>

                    {/* Trade log section - same as strategies view */}
                    <div className="bg-white border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                      {/* Tabs */}
                      <div className="border-b-4 border-black p-4 bg-white/40">
                        <TraderTabs defaultValue="positions" className="w-full">
                          <TraderTabsList className="bg-white/50 border-2 border-black rounded-xl p-1">
                            <TraderTabsTrigger
                              value="positions"
                              className="rounded-lg data-[state=active]:bg-black data-[state=active]:text-white font-bold"
                            >
                              Positions
                            </TraderTabsTrigger>
                            <TraderTabsTrigger
                              value="activity"
                              className="rounded-lg data-[state=active]:bg-black data-[state=active]:text-white font-bold"
                            >
                              Activity
                            </TraderTabsTrigger>
                          </TraderTabsList>
                        </TraderTabs>
                      </div>

                      {/* Filters */}
                      <div className="p-4 border-b-4 border-black flex flex-wrap gap-3 items-center">
                        <Button
                          variant="outline"
                          className="rounded-xl border-2 border-black font-bold bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        >
                          Active Trades
                        </Button>
                        <Button variant="ghost" className="rounded-xl font-bold hover:bg-black/10">
                          Closed
                        </Button>
                        <Input
                          placeholder="Search positions"
                          className="flex-1 min-w-[200px] rounded-xl border-2 border-black font-bold"
                        />
                        <Button
                          variant="outline"
                          className="rounded-xl border-2 border-black font-bold bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        >
                          Profit/Loss
                        </Button>
                      </div>

                      {/* Table header */}
                      <div className="grid grid-cols-12 gap-4 p-4 border-b-2 border-black bg-gray-50 text-xs font-bold text-gray-600">
                        <div className="col-span-1">RESULT</div>
                        <div className="col-span-5">MARKET</div>
                        <div className="col-span-3 text-right">TOTAL BET</div>
                        <div className="col-span-3 text-right">AMOUNT WON</div>
                      </div>

                      {/* Trade rows */}
                      <div className="divide-y-2 divide-black">
                        {trades.map((trade) => (
                          <div
                            key={trade.id}
                            className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors items-center"
                          >
                            <div className="col-span-1">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                                <span className="text-sm font-bold text-green-600 hidden lg:inline">Won</span>
                              </div>
                            </div>
                            <div className="col-span-5">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-gray-200 border-2 border-black flex items-center justify-center text-xl">
                                  {trade.icon}
                                </div>
                                <div>
                                  <p className="font-bold">{trade.market}</p>
                                  <p className="text-sm text-gray-600">{trade.details}</p>
                                </div>
                              </div>
                            </div>
                            <div className="col-span-3 text-right">
                              <p className="font-bold">{trade.totalBet}</p>
                            </div>
                            <div className="col-span-3 text-right">
                              <p className="font-bold">{trade.amountWon}</p>
                              <p className="text-sm text-green-600 font-bold">{trade.profit}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Leaderboard list view
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-3xl sm:text-4xl font-black">Leaderboard</h2>

                      <div className="flex gap-2 bg-white border-4 border-black rounded-xl p-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <button
                          onClick={() => setSelectedPlatform("polymarket")}
                          className={`px-6 py-2 rounded-lg font-bold transition-all ${
                            selectedPlatform === "polymarket"
                              ? "bg-black text-white"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          Polymarket
                        </button>
                        <button
                          onClick={() => setSelectedPlatform("kalshi")}
                          className={`px-6 py-2 rounded-lg font-bold transition-all ${
                            selectedPlatform === "kalshi" ? "bg-black text-white" : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          Kalshi
                        </button>
                      </div>
                    </div>

                    {/* Time period filters */}
                    <div className="flex flex-wrap gap-3 mb-6">
                      <Button variant="ghost" className="rounded-xl font-bold hover:bg-black/10">
                        Today
                      </Button>
                      <Button variant="ghost" className="rounded-xl font-bold hover:bg-black/10">
                        Weekly
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-xl border-2 border-black font-bold bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      >
                        Monthly
                      </Button>
                      <Button variant="ghost" className="rounded-xl font-bold hover:bg-black/10">
                        All
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="ml-auto rounded-xl border-2 border-black font-bold bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                          >
                            {selectedCategory} <ChevronDown className="ml-2 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                          {categories.map((category) => (
                            <DropdownMenuItem
                              key={category}
                              onClick={() => setSelectedCategory(category)}
                              className="font-bold cursor-pointer"
                            >
                              {category}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Search bar */}
                    <div className="relative mb-6">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        placeholder="Search by name"
                        className="pl-10 rounded-xl border-2 border-black font-bold"
                      />
                    </div>

                    {/* Leaderboard table */}
                    <div className="bg-white border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                      <div className="grid grid-cols-[60px_1fr_180px_180px_140px] gap-4 p-4 border-b-2 border-black bg-gray-50">
                        <div className="text-sm font-bold text-gray-600"></div>
                        <div className="text-sm font-bold text-gray-600"></div>
                        <div className="text-center text-sm font-bold text-gray-600 underline">Profit/Loss</div>
                        <div className="text-center text-sm font-bold text-gray-600">Volume</div>
                        <div className="text-sm font-bold text-gray-600"></div>
                      </div>

                      <div className="divide-y-2 divide-gray-100">
                        {filteredTraders.map((trader) => (
                          <div
                            key={trader.id}
                            className="grid grid-cols-[60px_1fr_180px_180px_140px] gap-4 p-4 hover:bg-gray-50 transition-colors items-center"
                          >
                            <div>
                              <span className="text-lg font-bold text-gray-600">{trader.rank}</span>
                            </div>
                            <div>
                              <button
                                onClick={() => {
                                  setSelectedTrader(trader.id.toString())
                                }}
                                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                              >
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 border-2 border-black flex items-center justify-center text-2xl">
                                  {trader.avatar}
                                </div>
                                <span className="font-bold">{trader.name}</span>
                              </button>
                            </div>
                            <div className="text-center">
                              <p className="font-bold text-green-600">{trader.profitLoss}</p>
                            </div>
                            <div className="text-center">
                              <p className="font-bold text-gray-600">{trader.volume}</p>
                            </div>
                            <div className="flex justify-center">
                              <Button
                                size="sm"
                                onClick={() => {
                                  if (!trader.isCopying) {
                                    setViewingFromLeaderboard(true)
                                    handleCopyClick(trader)
                                  }
                                }}
                                className={`rounded-full border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] px-6 ${
                                  trader.isCopying
                                    ? "bg-white text-black hover:bg-gray-100"
                                    : "bg-black text-white hover:bg-gray-800"
                                }`}
                              >
                                {trader.isCopying ? "Copying" : "Copy"}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              // Dashboard View (existing content)
              <>
                <div className="mb-8">
                  <h2 className="text-xl sm:text-2xl font-black mb-4">ACTIVE STRATEGIES</h2>

                  {selectedTrader ? (
                    // Trader detail view
                    <div>
                      {/* Back button and trader info header */}
                      <div className="mb-6">
                        <Button
                          variant="ghost"
                          onClick={() => setSelectedTrader(null)}
                          className="mb-4 font-bold hover:bg-black/10 rounded-xl"
                        >
                          <ArrowLeft className="h-5 w-5 mr-2" />
                          Back
                        </Button>

                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-2xl">
                              {topTraders.find((t) => t.id.toString() === selectedTrader)?.avatar || "👤"}
                            </div>
                            <div>
                              <h3 className="text-2xl font-black">
                                {topTraders.find((t) => t.id.toString() === selectedTrader)?.name || "Trader Name"}
                              </h3>
                              <p className="text-gray-600 font-bold">@tradertag</p>
                            </div>
                          </div>

                          <Button className="bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            Stop Copying
                          </Button>
                        </div>

                        {/* Stats cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                          <div className="bg-white border-4 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <p className="text-sm text-gray-600 font-bold mb-1">Copying Since</p>
                            <p className="text-xl font-black">Jan 15, 2025</p>
                          </div>
                          <div className="bg-white border-4 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <p className="text-sm text-gray-600 font-bold mb-1">Aggregate Performance</p>
                            <p className="text-xl font-black text-green-600">+127.5%</p>
                          </div>
                          <button className="bg-white border-4 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all text-left">
                            <p className="text-sm text-gray-600 font-bold mb-1">Budget</p>
                            <p className="text-xl font-black">$10,000</p>
                            <p className="text-xs text-blue-600 font-bold mt-1">Click to adjust →</p>
                          </button>
                        </div>
                      </div>

                      {/* Trade log section */}
                      <div className="bg-white border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                        {/* Tabs */}
                        <div className="border-b-4 border-black p-4 bg-white/40">
                          <TraderTabs defaultValue="positions" className="w-full">
                            <TraderTabsList className="bg-white/50 border-2 border-black rounded-xl p-1">
                              <TraderTabsTrigger
                                value="positions"
                                className="rounded-lg data-[state=active]:bg-black data-[state=active]:text-white font-bold"
                              >
                                Positions
                              </TraderTabsTrigger>
                              <TraderTabsTrigger
                                value="activity"
                                className="rounded-lg data-[state=active]:bg-black data-[state=active]:text-white font-bold"
                              >
                                Activity
                              </TraderTabsTrigger>
                            </TraderTabsList>
                          </TraderTabs>
                        </div>

                        {/* Filters */}
                        <div className="p-4 border-b-4 border-black flex flex-wrap gap-3 items-center">
                          <Button
                            variant="outline"
                            className="rounded-xl border-2 border-black font-bold bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                          >
                            Active Trades
                          </Button>
                          <Button variant="ghost" className="rounded-xl font-bold hover:bg-black/10">
                            Closed
                          </Button>
                          <Input
                            placeholder="Search positions"
                            className="flex-1 min-w-[200px] rounded-xl border-2 border-black font-bold"
                          />
                          <Button
                            variant="outline"
                            className="rounded-xl border-2 border-black font-bold bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                          >
                            Profit/Loss
                          </Button>
                        </div>

                        {/* Table header */}
                        <div className="grid grid-cols-12 gap-4 p-4 border-b-2 border-black bg-gray-50 text-xs font-bold text-gray-600">
                          <div className="col-span-1">RESULT</div>
                          <div className="col-span-5">MARKET</div>
                          <div className="col-span-3 text-right">TOTAL BET</div>
                          <div className="col-span-3 text-right">AMOUNT WON</div>
                        </div>

                        {/* Trade rows */}
                        <div className="divide-y-2 divide-black">
                          {trades.map((trade) => (
                            <div
                              key={trade.id}
                              className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors items-center"
                            >
                              <div className="col-span-1">
                                <div className="flex items-center gap-2">
                                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                                  <span className="text-sm font-bold text-green-600 hidden lg:inline">Won</span>
                                </div>
                              </div>
                              <div className="col-span-5">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-lg bg-gray-200 border-2 border-black flex items-center justify-center text-xl">
                                    {trade.icon}
                                  </div>
                                  <div>
                                    <p className="font-bold">{trade.market}</p>
                                    <p className="text-sm text-gray-600">{trade.details}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-span-3 text-right">
                                <p className="font-bold">{trade.totalBet}</p>
                              </div>
                              <div className="col-span-3 text-right">
                                <p className="font-bold">{trade.amountWon}</p>
                                <p className="text-sm text-green-600 font-bold">{trade.profit}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Strategy cards grid
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <SocialMediaCard
                        platform="Chopper"
                        username="@0x7fB7Ad0d194D7123e711e7db6C9D418fAc14E33d"
                        icon={<Instagram className="h-6 w-6" />}
                        traderAvatar="🏆"
                        color="bg-gradient-to-br from-purple-500 to-pink-500"
                        onSelect={() => setSelectedTrader("trader-1")}
                      />
                      <SocialMediaCard
                        platform="WhaleKing"
                        username="@0x8fC8B1d2e194E8234f822f8eb7D0E529gBd25F44e"
                        icon={<Twitter className="h-6 w-6" />}
                        traderAvatar="🐋"
                        color="bg-blue-400"
                        onSelect={() => setSelectedTrader("trader-2")}
                      />
                      <SocialMediaCard
                        platform="DiamondHands"
                        username="@0x9gD9C2f3f295F9345g933g9fc8E1F640hCe36G55f"
                        icon={<Linkedin className="h-6 w-6" />}
                        traderAvatar="💎"
                        color="bg-blue-600"
                        onSelect={() => setSelectedTrader("trader-3")}
                      />

                      <div className="h-full min-h-[200px] border-4 border-dashed border-black rounded-xl flex items-center justify-center bg-white/50 hover:bg-white/70 transition-colors">
                        <Button className="font-bold text-lg rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white hover:bg-gray-50 text-black">
                          <Plus className="h-5 w-5 mr-2" />
                          Add Strategy
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {!selectedTrader && (
                  <>
                    <div className="mb-10">
                      <h2 className="text-xl sm:text-2xl font-black mb-4">PORTFOLIO PERFORMANCE</h2>
                      <div className="bg-white border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
                        {/* Header with Profit/Loss label and time period buttons */}
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <TrendingUp className="h-5 w-5 text-green-600" />
                              <span className="text-sm font-bold text-gray-600">Profit/Loss</span>
                            </div>
                            <div className="text-4xl font-black mb-1">${currentPortfolioValue.toLocaleString()}</div>
                            <div className="text-sm text-gray-600 font-bold">
                              {portfolioTimePeriod === "ALL" ? "All-Time" : portfolioTimePeriod}
                            </div>
                          </div>

                          {/* Time period selector buttons */}
                          <div className="flex gap-2">
                            {(["1D", "1W", "1M", "ALL"] as const).map((period) => (
                              <button
                                key={period}
                                onClick={() => setPortfolioTimePeriod(period)}
                                className={`px-4 py-2 rounded-xl font-bold transition-all ${
                                  portfolioTimePeriod === period
                                    ? "bg-blue-500 text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                    : "bg-white text-gray-600 border-2 border-gray-300 hover:border-black"
                                }`}
                              >
                                {period}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Chart */}
                        <div className="h-[300px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={portfolioData}>
                              <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                              </defs>
                              <XAxis
                                dataKey="time"
                                stroke="#666"
                                style={{ fontSize: "12px", fontWeight: "bold" }}
                                tickLine={false}
                              />
                              <YAxis
                                stroke="#666"
                                style={{ fontSize: "12px", fontWeight: "bold" }}
                                tickLine={false}
                                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                              />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "white",
                                  border: "2px solid black",
                                  borderRadius: "8px",
                                  fontWeight: "bold",
                                }}
                                formatter={(value: any) => [`$${value.toLocaleString()}`, "Value"]}
                              />
                              <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#10b981"
                                strokeWidth={3}
                                fill="url(#colorValue)"
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>

                        {/* Profit indicator */}
                        <div className="mt-4 flex items-center justify-center gap-2 text-green-600 font-bold">
                          <TrendingUp className="h-5 w-5" />
                          <span>
                            +${profitAmount.toLocaleString()} (+{profitPercentage}%)
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
