// app/checkout/page.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import Confetti from 'react-confetti'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Rocket, Zap, Gift, Clock, Shield, Trophy } from 'lucide-react'
import Link from 'next/link'
import { FloatingParticles } from '@/components/FloatingParticles'

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
  // === Game State ===
  const [step, setStep] = useState(1)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [powerUp, setPowerUp] = useState(false)
  const [email, setEmail] = useState('')
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes
  const [achievement, setAchievement] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!

  // === Game Mechanics ===
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight
      })
    }
  }, [])

  // === Power-Ups ===
  const activatePowerUp = () => {
    setPowerUp(true)
    setAchievement('AI Accelerator Unlocked!')
    setTimeout(() => setAchievement(''), 3000)
  }

  // === Paystack Payment ===
  const handlePayment = async () => {
    if (!validateEmail(email)) {
      setAchievement('Enter a valid email!')
      setTimeout(() => setAchievement(''), 2000)
      return
    }

    try {
      await loadPaystackScript()
      
      const handler = window.PaystackPop!.setup({
        key: publicKey,
        email,
        amount: (powerUp ? 594 : 497) * 100,
        ref: `PYTHON-${Date.now()}`,
        onClose: () => {
          setAchievement('Payment canceled!')
          setTimeout(() => setAchievement(''), 2000)
        },
        callback: (response) => {
          celebratePurchase()
          console.log(response)
        }
      })
      
      handler.openIframe()
    } catch (error) {
      setAchievement('Payment error! Try again')
      setTimeout(() => setAchievement(''), 2000)
      console.error(error)
    }
  }

  const celebratePurchase = () => {
    setStep(5)
    setAchievement('LEVEL UP UNLOCKED!')
  }

  // === Helper Functions ===
  const loadPaystackScript = () => {
    return new Promise<void>((resolve) => {
      if (window.PaystackPop) return resolve()
      const script = document.createElement('script')
      script.src = 'https://js.paystack.co/v1/inline.js'
      script.onload = () => resolve()
      document.body.appendChild(script)
    })
  }

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  // === Game UI Components ===
  const ProgressBar = ({ progress }: { progress: number }) => (
    <div className="w-full bg-gray-800 rounded-full h-2.5 mb-4">
      <div 
        className="bg-gradient-to-r from-green-400 to-emerald-600 h-2.5 rounded-full transition-all duration-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  )

  const AchievementToast = () => (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-emerald-900/80 border border-emerald-700 text-emerald-100 px-6 py-3 rounded-full flex items-center gap-2 z-50 shadow-lg"
        >
          <Trophy className="text-yellow-300" size={18} />
          {achievement}
        </motion.div>
      )}
    </AnimatePresence>
  )

  // === Main Render ===
  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Game Elements */}
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

      {/* Floating code particles */}
      {/* {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-xs opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            color: i % 2 ? '#4ade80' : '#0ea5e9'
          }}
          animate={{
            y: [0, Math.random() * 100 - 50],
            x: [0, Math.random() * 50 - 25]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          {i % 3 === 0 ? 'AI' : i % 3 === 1 ? 'Python' : '$'}
        </motion.div>
      ))} */}

      <FloatingParticles numberOfParticles={20}/>

      <AchievementToast />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Game Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 flex items-center gap-2">
            {step < 5 ? (
              <>
                <span className="text-emerald-400">🎮</span> 
                <span>Checkpoint {step}/3</span>
              </>
            ) : (
              <span className="text-emerald-400">Mission Complete!</span>
            )}
          </h1>
          
          <div className="flex justify-between items-center">
            <ProgressBar progress={step === 1 ? 33 : step === 2 ? 66 : step >= 3 ? 100 : 0} />
            {step < 5 && (
              <div className="flex items-center gap-2 bg-red-900/30 border border-red-700/50 rounded-full px-3 py-1 ml-4">
                <Clock size={16} className="text-red-400" />
                <span className="font-mono text-sm">{formatTime(timeLeft)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Game Card */}
        <motion.div 
          className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* LEVEL 1: Order Summary */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 sm:p-8"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="bg-gray-700 text-emerald-400 rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  1
                </span>
                Your Quest Items
              </h2>

              {/* Power-Up Card */}
              <motion.div 
                whileHover={{ y: -3 }}
                className={`border rounded-xl p-6 mb-8 cursor-pointer transition-all ${powerUp ? 'border-emerald-500/30 bg-emerald-900/10' : 'border-gray-700 bg-gray-900/50'}`}
                onClick={activatePowerUp}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg p-3 text-2xl">
                    ⚡
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">AI Accelerator Pack</h3>
                    <p className="text-gray-400 text-sm mb-3">
                      +50 ChatGPT prompts, private community, 1-on-1 onboarding
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="font-bold text-emerald-400">
                        $97 <span className="line-through text-gray-500 text-sm">$197</span>
                      </div>
                      {powerUp ? (
                        <span className="text-xs bg-emerald-900/30 px-2 py-1 rounded-full text-emerald-400">
                          ✅ SELECTED
                        </span>
                      ) : (
                        <span className="text-xs bg-purple-900/30 px-2 py-1 rounded-full text-purple-400">
                          CLICK TO ADD
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* XP Summary */}
              <div className="border-t border-gray-800 pt-6 mb-8">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total XP Cost</span>
                  <span>${powerUp ? 594 : 497}</span>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-bold rounded-lg shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center gap-2"
                >
                  Continue <Rocket size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {/* LEVEL 2: Player Details */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 sm:p-8"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="bg-gray-700 text-emerald-400 rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  2
                </span>
                Identify Your Character
              </h2>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Email (Your Save Point)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 transition-all"
                  placeholder="hero@pythonpower.com"
                  required
                />
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 border border-gray-700 rounded-lg hover:bg-gray-800 transition-all"
                >
                  Back
                </button>
                <button
                  onClick={() => validateEmail(email) ? setStep(3) : setAchievement('Enter valid email!')}
                  className={`px-6 py-3 rounded-lg font-bold flex items-center gap-2 ${validateEmail(email) ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black shadow-lg hover:shadow-emerald-500/30' : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
                >
                  Proceed to Battle <Zap size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* LEVEL 3: Final Boss (Payment) */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 sm:p-8"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="bg-gray-700 text-emerald-400 rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  3
                </span>
                Final Boss: Payment Gateway
              </h2>

              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-8">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Shield className="text-yellow-400" size={18} />
                  Secure Payment Portal
                </h3>
                <p className="text-gray-400 mb-6">
                  Click below to open the Paystack secure payment interface where you can complete your quest.
                </p>
                
                <button
                  onClick={handlePayment}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 text-black font-bold py-4 px-6 rounded-lg shadow-lg hover:shadow-yellow-500/30 transition-all flex items-center justify-center gap-2"
                >
                  Open Payment Portal <Zap size={18} />
                </button>
              </div>

              {/* Inventory Check */}
              <div className="border-t border-gray-800 pt-6 mb-8">
                <h3 className="font-medium mb-4">Your Inventory</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Python Power Core</span>
                    <span>$497</span>
                  </div>
                  {powerUp && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">AI Accelerator Pack</span>
                      <span className="text-emerald-400">$97</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold pt-3 border-t border-gray-800">
                    <span>Total Cost</span>
                    <span>${powerUp ? 594 : 497}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 border border-gray-700 rounded-lg hover:bg-gray-800 transition-all"
                >
                  Back
                </button>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Shield className="text-emerald-400" size={16} />
                  Secure 256-bit encryption
                </div>
              </div>
            </motion.div>
          )}

          {/* VICTORY SCREEN */}
          {step === 5 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 text-center"
            >
              <div className="bg-gradient-to-br from-emerald-900/30 to-emerald-800/20 border border-emerald-700/30 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-emerald-400" />
              </div>
              
              <h2 className="text-3xl font-bold mb-3">QUEST COMPLETE!</h2>
              <p className="text-xl text-gray-300 mb-6">
                You&#39;ve unlocked Python Power!
              </p>

              <div className="max-w-md mx-auto bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-8">
                <h3 className="font-bold mb-4 flex items-center gap-2 justify-center">
                  <Gift className="text-emerald-400" />
                  Your Loot:
                </h3>
                <ul className="space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>Full Python Power access</span>
                  </li>
                  {powerUp && (
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>AI Accelerator Pack</span>
                    </li>
                  )}
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>60-Day Money-Back Guarantee</span>
                  </li>
                </ul>
              </div>

              <Link href="/dashboard">
                <button className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-bold rounded-lg shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center gap-2 mx-auto">
                  Enter Your Dashboard <Rocket size={18} />
                </button>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}