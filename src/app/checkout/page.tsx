// app/checkout/page.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import Confetti from 'react-confetti'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, CheckCircle, Rocket, Zap, Gift } from 'lucide-react'

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [addedBonus, setAddedBonus] = useState(false)
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds
  const containerRef = useRef<HTMLDivElement>(null)
  const stripe = useStripe()
  const elements = useElements()

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Set confetti dimensions
  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight
      })
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!stripe || !elements) return

    // Simulate processing
    setStep(4)
    
    // Process payment (replace with actual Stripe logic)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Success state
    setStep(5)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 py-12 px-4 sm:px-6 lg:px-8"
    >
      {/* Confetti celebration */}
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
        {/* Progress tracker */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl sm:text-4xl font-heading font-bold">
              {step < 4 ? (
                <span className="flex items-center gap-2">
                  <span className="text-accent">🎮</span> Level Up Your Skills
                </span>
              ) : (
                <span className="text-accent">Purchase Complete!</span>
              )}
            </h1>
            {step < 4 && (
              <div className="flex items-center gap-2 bg-red-900/30 border border-red-700/50 rounded-full px-3 py-1">
                <span className="text-red-400">⏱️</span>
                <span className="font-mono text-sm">{formatTime(timeLeft)}</span>
              </div>
            )}
          </div>
          
          {/* Game-like progress bar */}
          <div className="w-full bg-gray-800 rounded-full h-3 mb-2">
            <motion.div 
              className="h-full bg-gradient-to-r from-green-400 to-emerald-600 rounded-full"
              initial={{ width: '0%' }}
              animate={{ 
                width: 
                  step === 1 ? '33%' : 
                  step === 2 ? '66%' : 
                  step >= 3 ? '100%' : '0%'
              }}
              transition={{ duration: 0.5, type: 'spring' }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>Cart</span>
            <span>Details</span>
            <span>Payment</span>
            <span>Complete</span>
          </div>
        </div>

        {/* Main checkout container */}
        <motion.div 
          className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Step 1: Order Summary */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 sm:p-8"
            >
              <div className="flex items-start gap-6 mb-8">
                <div className="bg-gradient-to-br from-primary to-secondary rounded-lg p-4 text-3xl">
                  🐍
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-1">Python Power: AI-Proof Coding</h2>
                  <p className="text-gray-400">60-day mastery program</p>
                  <div className="mt-2 font-heading font-bold text-2xl text-accent">
                    $497
                  </div>
                </div>
              </div>

              {/* Limited-time bonus */}
              <div className={`border rounded-xl p-6 mb-8 transition-all duration-500 ${addedBonus ? 'border-emerald-500/30 bg-emerald-900/10' : 'border-gray-700 bg-gray-900/50'}`}>
                <div className="flex flex-col sm:flex-row gap-6 items-center">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-2xl">
                      ⚡
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">AI Accelerator Pack</h3>
                    <p className="text-sm text-gray-400 mb-3">
                      Includes: 50 ChatGPT prompts + Private community + 1-on-1 onboarding
                    </p>
                    
                    <div className="flex items-center gap-4">
                      <div className="font-heading font-bold text-emerald-400">
                        $97 <span className="line-through text-gray-500 text-sm">$197</span>
                      </div>
                      
                      {!addedBonus ? (
                        <button
                          onClick={() => setAddedBonus(true)}
                          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-lg text-sm font-medium transition-all transform hover:scale-105"
                        >
                          Add to Order
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 text-sm text-emerald-400">
                          <span>✅ Added</span>
                          <span className="text-xs bg-emerald-900/30 px-2 py-1 rounded">SAVED $100</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order total */}
              <div className="border-t border-gray-800 pt-6">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>$497</span>
                </div>
                {addedBonus && (
                  <div className="flex justify-between mb-2">
                    <span>Bonus Pack</span>
                    <span className="text-emerald-400">$97</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg mt-4">
                  <span>Total</span>
                  <span>${addedBonus ? 594 : 497}</span>
                </div>
              </div>

              {/* Next step button */}
              <button
                onClick={() => setStep(2)}
                className="w-full mt-8 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-bold py-4 px-6 rounded-lg shadow-lg hover:shadow-emerald-500/30 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Continue to Checkout</span>
                <Rocket className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {/* Step 2: Customer Details */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 sm:p-8"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="bg-gray-700 text-accent rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                Your Information
              </h2>
              
              <form>
                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">
                      First Name
                    </label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">
                      Last Name
                    </label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 transition-all"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium mb-1 text-gray-300">
                      Email
                    </label>
                    <input 
                      type="email" 
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 transition-all"
                      placeholder="you@willearn120k.com"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-3 border border-gray-700 rounded-lg hover:bg-gray-800 transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-bold rounded-lg shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center gap-2"
                  >
                    Continue to Payment <Zap className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 sm:p-8"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="bg-gray-700 text-accent rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                Payment Details
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-8">
                  <div className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/50 transition-all mb-4">
                    <CardElement 
                      options={{
                        style: {
                          base: {
                            fontSize: '16px',
                            color: '#fff',
                            '::placeholder': {
                              color: '#6b7280',
                            },
                            iconColor: '#4ade80',
                          },
                        },
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                    Payments are secure and encrypted
                  </div>
                </div>

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

                {/* Guarantee badge */}
                <div className="flex items-center gap-3 bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-8">
                  <CheckCircle className="text-emerald-400 flex-shrink-0" />
                  <div>
                    <div className="font-medium">60-Day Money-Back Guarantee</div>
                    <div className="text-sm text-gray-400">If you don&#39;t see results, we&#39;ll refund every penny</div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3 border border-gray-700 rounded-lg hover:bg-gray-800 transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-bold rounded-lg shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center gap-2"
                  >
                    Complete Purchase <Rocket className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Step 4: Processing */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-12 text-center"
            >
              <div className="flex justify-center mb-6">
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
                </motion.div>
              </div>
              <h2 className="text-2xl font-bold mb-3">Securing Your Access</h2>
              <p className="text-gray-400 max-w-md mx-auto">
                We&#39;re processing your payment and setting up your AI-Powered future...
              </p>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '60%' }}
                transition={{ duration: 3 }}
                className="h-1 bg-gray-800 rounded-full mt-8 mx-auto max-w-sm"
              >
                <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full" />
              </motion.div>
            </motion.div>
          )}

          {/* Step 5: Success */}
          {step === 5 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-12 text-center"
            >
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-emerald-900/20 border border-emerald-700/30 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-12 h-12 text-emerald-400" />
              </motion.div>
              <h2 className="text-3xl font-bold mb-3">Welcome to the AI Elite!</h2>
              <p className="text-xl text-gray-300 mb-8">
                Your Python Power journey starts now
              </p>
              <div className="max-w-md mx-auto bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-8">
                <h3 className="font-bold mb-3 flex items-center gap-2 justify-center">
                  <Gift className="text-emerald-400" />
                  Your Bonuses:
                </h3>
                <ul className="space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>Python Power Core Curriculum</span>
                  </li>
                  {addedBonus && (
                    <>
                      <li className="flex items-center gap-2">
                        <span className="text-emerald-400">✓</span>
                        <span>AI Accelerator Pack</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-emerald-400">✓</span>
                        <span>Private Community Access</span>
                      </li>
                    </>
                  )}
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>60-Day Money-Back Guarantee</span>
                  </li>
                </ul>
              </div>
              <p className="text-gray-400 mb-6">
                Check your email for login instructions. Redirecting to dashboard...
              </p>
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                  </span>
                  <span className="text-sm">Loading your dashboard</span>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-12">
          <div className="flex items-center gap-2 text-gray-400">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
            <span>256-bit SSL Encryption</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
            </svg>
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
            <span>Money-Back Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  )
}