'use client'

import { useState, useEffect, useRef } from 'react'
import Confetti from 'react-confetti'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'

// Extend the window type to include PaystackPop
declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: {
        key: string
        email: string
        amount: number
        ref: string
        onClose: () => void
        callback: (response: { reference: string }) => void
      }) => { openIframe: () => void }
    }
  }
}

export default function CheckoutPage() {
  // === STATE ===
  const [step, setStep] = useState(1)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [addedBonus, setAddedBonus] = useState(false)
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes
  const [email, setEmail] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  // === TIMERS ===
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Confetti container size
  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      })
    }
  }, [])

  // === PAYSTACK CONFIG ===
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!
  const amount = (addedBonus ? 594 : 497) * 100 // Paystack wants amount in kobo

  // === PAYMENT CALLBACKS ===
  const onSuccess = (reference: string) => {
    console.log('Payment successful!', reference)
    setStep(5) // Show success screen
  }

  const onClose = () => {
    console.log('Payment closed by user')
    // Optionally handle modal close without payment
  }

  // === FORM VALIDATION ===
  const isEmailValid = () => {
    return /^\S+@\S+\.\S+$/.test(email)
  }

  // === LOAD PAYSTACK SCRIPT ===
  const loadPaystackScript = () => {
    return new Promise<void>((resolve, reject) => {
      if (window.PaystackPop) {
        resolve()
        return
      }
      const script = document.createElement('script')
      script.src = 'https://js.paystack.co/v1/inline.js'
      script.async = true
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('Failed to load Paystack script'))
      document.body.appendChild(script)
    })
  }

  // === HANDLE PAYMENT ===
  const handlePayment = async () => {
    if (!isEmailValid()) {
      alert('Please enter a valid email address')
      setStep(2)
      return
    }
    try {
      await loadPaystackScript()
      if (!window.PaystackPop) {
        alert('Paystack SDK failed to load')
        return
      }
      const handler = window.PaystackPop.setup({
        key: publicKey,
        email,
        amount,
        ref: `${Date.now()}`,
        onClose,
        callback: (response) => onSuccess(response.reference),
      })
      handler.openIframe()
    } catch (error) {
      alert('An error occurred loading payment gateway. Please try again.')
      console.error(error)
    }
  }

  // Format timeLeft as mm:ss
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  // === UI RENDERING ===
  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 py-12 px-4 sm:px-6 lg:px-8"
    >
      {/* Confetti celebration on success */}
      <AnimatePresence>
        {step === 5 && (
          <Confetti
            width={dimensions.width}
            height={dimensions.height}
            recycle={false}
            numberOfPieces={800}
            gravity={0.2}
          />
        )}
      </AnimatePresence>

      <div className="max-w-3xl mx-auto">
        {/* Progress tracker (simplified) */}
        <div className="mb-8 flex justify-between text-gray-400 font-semibold text-sm select-none">
          <span className={step >= 1 ? 'text-emerald-400' : ''}>1. Order</span>
          <span className={step >= 2 ? 'text-emerald-400' : ''}>2. Details</span>
          <span className={step >= 3 ? 'text-emerald-400' : ''}>3. Payment</span>
          <span className={step >= 4 ? 'text-emerald-400' : ''}>4. Confirmation</span>
        </div>

        {/* Countdown timer visible on all steps except success */}
        {step !== 5 && (
          <div className="mb-4 text-right text-gray-400 font-mono tracking-wide">
            Time Left: {formatTime(timeLeft)}
          </div>
        )}

        {/* Checkout card */}
        <motion.div
          className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* STEP 1 - ORDER */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 sm:p-8"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="bg-gray-700 text-accent rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  1
                </span>
                Your Order
              </h2>

              <div className="mb-4">
                <label className="inline-flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded-md border-gray-700 text-emerald-500 focus:ring-emerald-500"
                    checked={addedBonus}
                    onChange={(e) => setAddedBonus(e.target.checked)}
                  />
                  <div>
                    <div className="text-white font-semibold">Add AI Accelerator Pack</div>
                    <div className="text-gray-400 text-sm">
                      Bonus content for just $97 more
                    </div>
                  </div>
                </label>
              </div>

              <div className="mb-8 border-t border-gray-800 pt-6">
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${addedBonus ? 594 : 497}</span>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-lg shadow-lg transition"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2 - DETAILS */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 sm:p-8"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="bg-gray-700 text-accent rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  2
                </span>
                Your Details
              </h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (isEmailValid()) {
                    setStep(3)
                  } else {
                    alert('Please enter a valid email address')
                  }
                }}
                noValidate
              >
                <div className="mb-6">
                  <label htmlFor="email" className="block mb-2 font-medium">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-md border border-gray-700 bg-gray-900 text-white p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-3 border border-gray-700 rounded-lg hover:bg-gray-800 transition"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={!isEmailValid()}
                    className={`px-6 py-3 bg-emerald-500 text-black font-bold rounded-lg shadow-lg transition ${!isEmailValid() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-600'
                      }`}
                  >
                    Continue
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* STEP 3 - PAYMENT */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 sm:p-8"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="bg-gray-700 text-accent rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  3
                </span>
                Payment Details
              </h2>

              <p className="mb-4 text-gray-400">
                Click below to securely pay with Paystack.
              </p>

              <button
                onClick={handlePayment}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-bold rounded-lg shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center justify-center"
              >
                Complete Purchase
              </button>

              {/* Order summary */}
              <div className="border-t border-gray-800 pt-6 mb-8">
                <h3 className="font-medium mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Python Power</span>
                    <span>$497</span>
                  </div>
                  {addedBonus && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">AI Accelerator Pack</span>
                      <span className="text-emerald-400">$97</span>
                    </div>
                  )}
                  <div className="flex justify-between font-medium pt-3 border-t border-gray-800">
                    <span>Total</span>
                    <span>${addedBonus ? 594 : 497}</span>
                  </div>
                </div>
              </div>

              {/* Guarantee */}
              <div className="flex items-center gap-3 bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-8">
                <CheckCircle className="text-emerald-400 flex-shrink-0" />
                <div>
                  <div className="font-medium">60-Day Money-Back Guarantee</div>
                  <div className="text-sm text-gray-400">
                    If you don&#39;t see results, we&#39;ll refund every penny
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 border border-gray-700 rounded-lg hover:bg-gray-800 transition"
                >
                  Back
                </button>
                <div />
              </div>
            </motion.div>
          )}

          {/* STEP 5 - SUCCESS */}
          {step === 5 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-8 text-center"
            >
              <CheckCircle className="mx-auto mb-6 text-emerald-400" size={48} />
              <h2 className="text-3xl font-bold mb-4">Thank you for your purchase!</h2>
              <p className="mb-6 text-gray-400">
                We have received your payment and will email your access details shortly.
              </p>
              <Link href='/'>
                <button
                  // onClick={() => window.location.reload()}

                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-lg shadow-lg transition"
                >
                  Go back home
                </button>
              </Link>
              {/* <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-lg shadow-lg transition"
              >
                Make Another Purchase
              </button> */}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
