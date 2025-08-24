import { dodopayments } from "@/shared/lib/dodo-payments";
import { APIError } from "dodopayments";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const validator = z.object({
  productId: z.string(),
  email: z.email(),
});
export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const parsedBody = validator.safeParse(body);
  if (parsedBody.success) {
    const { productId, email } = parsedBody.data;
    const productWithQuantity = {
      product_id: productId,
      quantity: 1,
    };
    try {
      const response = await dodopayments.subscriptions.create({
        // GET BILLING, CUSTOMER INFO FROM CUSTOMER AND PASS IT.
        // FOR COUNTRY CODE THE VALUE SHOULD BE - ISO country code alpha2 variant
        billing: {
          city: "",
          country: "KZ",
          state: "",
          street: "",
          zipcode: "",
        },
        customer: {
          email: email,
          name: "",
        },
        payment_link: true,

        return_url: process.env.DODO_PAYMENTS_RETURN_URL,
        product_id: productId,
        quantity: 1,
      });
      return NextResponse.json(response);
    } catch (e) {
      const dodoError = e as APIError;
      return NextResponse.json(dodoError.message, {
        status: dodoError.status,
      });
    }
  } else {
    return NextResponse.json(parsedBody.error.message, { status: 400 });
  }
};
