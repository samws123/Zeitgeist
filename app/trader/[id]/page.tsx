"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TraderDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  // Mock trade data - in production this would come from an API
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-2 sm:p-4 md:p-8">
      <div className="w-full max-w-7xl mx-auto backdrop-blur-xl bg-white/30 border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        {/* Header - same as main page */}
        <header className="border-b-4 border-black p-4 sm:p-6 bg-white/40 backdrop-blur-md">
          <div className="flex justify-between items-center gap-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">ZEITGEIST</h1>

            <span className="hidden lg:block text-xs sm:text-sm font-bold">
              Copy Trade Polymarket's Biggest Whales for Free
            </span>

            <div className="hidden sm:flex items-center gap-3">
              <Button
                variant="outline"
                className="rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-transparent"
              >
                Connect Wallet
              </Button>
              <Button
                variant="outline"
                className="rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-transparent"
              >
                Settings
              </Button>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6">
          {/* Back button and trader info header */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mb-4 font-bold hover:bg-black/10 rounded-xl"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Button>

            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-2xl">
                  👤
                </div>
                <div>
                  <h2 className="text-2xl font-black">Trader Name</h2>
                  <p className="text-gray-600 font-bold">@tradertag</p>
                </div>
              </div>

              <Button className="bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                Stop Following
              </Button>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-white border-4 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <p className="text-sm text-gray-600 font-bold mb-1">Following Since</p>
                <p className="text-xl font-black">Jan 15, 2025</p>
              </div>
              <div className="bg-white border-4 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <p className="text-sm text-gray-600 font-bold mb-1">Aggregate Performance</p>
                <p className="text-xl font-black text-green-600">+127.5%</p>
              </div>
              <div className="bg-white border-4 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <p className="text-sm text-gray-600 font-bold mb-1">Budget</p>
                <p className="text-xl font-black">$10,000</p>
              </div>
            </div>
          </div>

          {/* Trade log section */}
          <div className="bg-white border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            {/* Tabs */}
            <div className="border-b-4 border-black p-4 bg-white/40">
              <Tabs defaultValue="positions" className="w-full">
                <TabsList className="bg-white/50 border-2 border-black rounded-xl p-1">
                  <TabsTrigger
                    value="positions"
                    className="rounded-lg data-[state=active]:bg-black data-[state=active]:text-white font-bold"
                  >
                    Positions
                  </TabsTrigger>
                  <TabsTrigger
                    value="activity"
                    className="rounded-lg data-[state=active]:bg-black data-[state=active]:text-white font-bold"
                  >
                    Activity
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Filters */}
            <div className="p-4 border-b-4 border-black flex flex-wrap gap-3 items-center">
              <Button
                variant="outline"
                className="rounded-xl border-2 border-black font-bold bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Active
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
                      <span className="text-sm font-bold text-green-600">Won</span>
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
      </div>
    </div>
  )
}
