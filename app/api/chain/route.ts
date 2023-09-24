import { NextRequest, NextResponse } from "next/server";
import * as dotenv from "dotenv";
dotenv.config();

const CHAIN_ID = process.env.CHAIN_ID;
if (!CHAIN_ID) {
  throw new Error("CHAIN_ID not set");
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 200,
    chainId: CHAIN_ID,
  });
}
