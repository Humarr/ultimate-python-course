// app/checkout/checkout-form.tsx
'use client'

import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { useState } from 'react'
import Confetti from 'react-confetti'

export default function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)!,
    })

    if (stripeError) {
      setError(stripeError.message || 'Payment failed')
      return
    }

    // Send paymentMethod.id to your backend
    const response = await fetch('/api/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
    })

    const result = await response.json()

    if (result.success) {
      setSuccess(true)
    } else {
      setError(result.error || 'Payment failed')
    }
  }

  if (success) {
    return (
      <div className="text-center p-8">
        <Confetti width={window.innerWidth} height={window.innerHeight} />
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p>You now have access to Python Power.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <button
        type="submit"
        disabled={!stripe}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition"
      >
        Pay Now
      </button>
    </form>
  )
}