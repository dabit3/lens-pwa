import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  // parse out the user's walletAddress and creatorContractAddress
  const data = await request.text();
  let parsedBody;
  try {
    parsedBody = JSON.parse(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid JSON in request body." },
      { status: 400 }
    );
  }
  if (!parsedBody.fanPublicAddress || !parsedBody.creatorContractAddress) {
    return NextResponse.json(
      { message: "Missing fanPublicAddress or creatorContractAddress." },
      { status: 400 }
    );
  }

  const sub = await prisma.subscription.findUnique({
    where: {
      creatorContractAddress_fanPublicAddress: {
        creatorContractAddress: parsedBody.creatorContractAddress,
        fanPublicAddress: parsedBody.fanPublicAddress,
      },
    },
  });

  const numKeys = (sub?.numKeys ?? 0) + 1;
  await prisma.subscription.upsert({
    create: {
      creatorContractAddress: parsedBody.creatorContractAddress,
      fanPublicAddress: parsedBody.fanPublicAddress,
      numKeys,
    },
    update: {
      numKeys,
    },
    where: {
      creatorContractAddress_fanPublicAddress: {
        creatorContractAddress: parsedBody.creatorContractAddress,
        fanPublicAddress: parsedBody.fanPublicAddress,
      },
    },
  });

  return NextResponse.json(
    {
      body: "Hello World",
      path: request.nextUrl.pathname,
      query: request.nextUrl.search,
      cookies: request.cookies.getAll(),
    },
    {
      status: 200,
    }
  );
}
