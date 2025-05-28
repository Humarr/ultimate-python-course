// app/checkout/page.tsx
import StripeProvider from './stripe-provider'
import CheckoutForm from './checkout-form'

export default function CheckoutPage() {
  return (
    <StripeProvider>
      <CheckoutForm />
    </StripeProvider>
  )
}