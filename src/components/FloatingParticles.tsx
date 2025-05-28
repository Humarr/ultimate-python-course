'use client'

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function FloatingParticles({ numberOfParticles = 20 }: { numberOfParticles?: number }) {
    const [particles, setParticles] = useState<
        { left: string; top: string; color: string; x: number; y: number; duration: number }[]
    >([])

    useEffect(() => {
        const generated = [...Array(numberOfParticles)].map(() => {
            const left = `${Math.random() * 100}%`
            const top = `${Math.random() * 100}%`
            const color = Math.random() > 0.5 ? '#4ade80' : '#0ea5e9'
            const x = Math.random() * 50 - 25
            const y = Math.random() * 100 - 50
            const duration = Math.random() * 10 + 10

            return { left, top, color, x, y, duration }
        })

        setParticles(generated)
    }, [numberOfParticles])

    return (
        <div className="absolute inset-0 z-0 opacity-70">
            {particles.map((p, i) => (
                <motion.div
                    key={i}
                    initial={{ y: 0, x: 0 }}
                    animate={{ y: [0, p.y], x: [0, p.x] }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                    className="absolute text-xs opacity-70"
                    style={{
                        left: p.left,
                        top: p.top,
                        color: p.color,
                        textShadow: '0 0 4px rgba(255, 255, 255, 0.3)'
                    }}
                >
                    {i % 3 === 0 ? 'AI' : i % 3 === 1 ? 'Python' : '$'}
                </motion.div>
            ))}
        </div>
    )
}
