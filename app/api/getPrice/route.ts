import { put } from '@vercel/blob';
import { ShareSample__factory } from '../../../typechain/factories/ShareSample__factory'
import { ethers } from 'ethers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as dotenv from "dotenv";
dotenv.config();

const RPC = process.env.RPC_URL;
if (!RPC) {
	throw new Error("RPC not set");
}

export function getContractProvider(address: string) {
	const provider = new ethers.providers.JsonRpcProvider(RPC);
	return ShareSample__factory.connect(pacoAddress, provider);
}

const contract = getContractProvider(0x5fbdb2315678afecb367f032d93f642f64180aa3);

export async function GET() {
    return NextResponse.json({ status: 200 });
}