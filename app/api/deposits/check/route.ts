import { NextRequest, NextResponse } from "next/server";
import { createPublicClient, http, formatUnits, getAddress } from "viem";
import { polygon } from "viem/chains";
import { erc20Abi } from "viem";

const client = createPublicClient({ chain: polygon, transport: http(process.env.POLYGON_RPC_URL) });
// Support multiple USDC variants via env
const raw =
  process.env.USDC_ADDRESSES ??
  [process.env.POLYMARKET_USDC_E_ADDRESS, process.env.POLYMARKET_USDC_NATIVE_ADDRESS]
    .filter(Boolean)
    .join(",");
const USDCs = (raw ? raw.split(",").map((s) => s.trim()).filter(Boolean) : []) as `0x${string}`[];

export async function GET(req: NextRequest) {
  if (!USDCs.length)
    return NextResponse.json({ error: "No USDC addresses configured" }, { status: 500 });
  const url = new URL(req.url);
  const addr = url.searchParams.get("address");
  if (!addr) return NextResponse.json({ error: "address required" }, { status: 400 });

  const to = getAddress(addr as `0x${string}`);
  const latest = await client.getBlockNumber();
  const fromBlock = latest > 3000n ? latest - 3000n : 0n;

  const transferTopic = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
  const paddedTo = `0x${"0".repeat(24)}${to.slice(2).toLowerCase()}`;

  const logs = await client.getLogs({
    address: USDCs, // accept both USDC.e and native USDC
    fromBlock,
    toBlock: latest,
    topics: [transferTopic, null, paddedTo],
  });

  let latestMatch: any = null;
  if (logs.length) {
    const log = logs[logs.length - 1];
    const amount = Number(formatUnits(BigInt(log.data), 6));
    latestMatch = { tx: log.transactionHash, amount, found: true, block: log.blockNumber };
  }

  return NextResponse.json({ latest: latestMatch });
}


