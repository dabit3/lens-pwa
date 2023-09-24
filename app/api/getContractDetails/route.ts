import { ShareSample__factory } from "../../../typechain/factories/ShareSample__factory";
import { ethers } from "ethers";
import { NextRequest, NextResponse } from "next/server";
import * as dotenv from "dotenv";
import { getKeyContractProvider } from "@/utils/ethers";
import { InfoBlob } from "@/app/types";
dotenv.config();

export async function GET(request: NextRequest) {
  const contractAddress = request.nextUrl.searchParams.get("contractAddress");
  if (!contractAddress) {
    return NextResponse.json(
      { message: "contractAddress not provided." },
      { status: 400 }
    );
  }
  const walletAddress = request.nextUrl.searchParams.get("walletAddress");
  if (!walletAddress) {
    return NextResponse.json(
      { message: "walletAddress not provided." },
      { status: 400 }
    );
  }

  const contract = getKeyContractProvider(contractAddress);
  const values = await Promise.all([
    contract.getCurrentPrice(),
    contract.getCurrentPrice(),
    contract.getSubscriptionPoolRemaining(walletAddress),
    contract.getSupply(),
    contract.balanceOf(walletAddress),
  ]);
  const price = ethers.utils.formatEther(values[0]);
  const feePerc = 0.15;
  const fee = ethers.utils.formatUnits(values[1].toNumber() * feePerc, 18);
  const remainingDeposit = ethers.utils.formatEther(values[2]);
  const supply = ethers.utils.formatEther(values[3]);
  const balance = values[4].toNumber();

  return NextResponse.json<InfoBlob>({
    price: price,
    fee: fee,
    remainingDeposit: remainingDeposit,
    supply: supply,
    balance: balance,
  });
}
