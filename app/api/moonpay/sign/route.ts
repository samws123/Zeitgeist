import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const MOONPAY_BASE = "https://buy.moonpay.com";

export async function GET(req: NextRequest) {
  const apiKey = process.env.MOONPAY_API_KEY;
  const secret = process.env.MOONPAY_SECRET;
  if (!apiKey || !secret) return NextResponse.json({ error: "MoonPay not configured" }, { status: 500 });

  const url = new URL(req.url);
  const walletAddress = url.searchParams.get("walletAddress");
  if (!walletAddress) return NextResponse.json({ error: "walletAddress required" }, { status: 400 });

  const baseCurrencyCode = url.searchParams.get("baseCurrencyCode") || "USDC";
  const baseCurrencyAmount = url.searchParams.get("baseCurrencyAmount") || "250";
  const fiatCurrency = url.searchParams.get("fiatCurrency") || "USD";

  const qp = new URLSearchParams({
    apiKey,
    walletAddress,
    baseCurrencyCode,
    baseCurrencyAmount,
    fiatCurrency,
  }).toString();

  const signature = crypto.createHmac("sha256", secret).update(qp).digest("base64");
  const signed = `${MOONPAY_BASE}?${qp}&signature=${encodeURIComponent(signature)}`;
  return NextResponse.json({ url: signed });
}


