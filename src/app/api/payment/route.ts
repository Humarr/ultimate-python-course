// app/api/payment/route.ts
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: Request) {
  const { paymentMethodId } = await request.json()

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 49700, // $497 in cents
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
    })

    console.log(paymentIntent)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Payment failed' }, { status: 400 })
  }
}