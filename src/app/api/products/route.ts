import { dodopayments } from "@/shared/lib/dodo-payments";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const recurring  = Boolean(request.nextUrl.searchParams.get("recurring"))
  const products = await dodopayments.products.list({recurring});
  return NextResponse.json(products.items);
};
