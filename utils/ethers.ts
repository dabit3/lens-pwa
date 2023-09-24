import * as dotenv from "dotenv";
dotenv.config();

import { ShareSample__factory } from "../typechain/factories/ShareSample__factory";
import { ShareSampleFactory__factory } from "../typechain/factories/ShareSampleFactory__factory";
import { ethers } from "ethers";

const RPC = process.env.RPC_URL;
if (!RPC) {
  throw new Error("RPC not set");
}

export function getKeyContractProvider(address: string) {
  const provider = new ethers.providers.JsonRpcProvider(RPC);
  return ShareSample__factory.connect(address, provider);
}

export function getKeyContractFactoryProvider() {
  const FACTORY_ADDRESS = process.env.FACTORY_ADDRESS;
  if (!FACTORY_ADDRESS) {
    throw new Error("FACTORY_ADDRESS not set");
  }

  const OWNER_KEY = process.env.OWNER_KEY;
  if (!OWNER_KEY) {
    throw new Error("OWNER_KEY not set");
  }

  const provider = new ethers.providers.JsonRpcProvider(RPC);
  const w = new ethers.Wallet(OWNER_KEY, provider);

  return ShareSampleFactory__factory.connect(FACTORY_ADDRESS, w);
}
