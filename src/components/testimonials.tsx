'use client';
// app/_components/testimonials.tsx
import { motion } from "framer-motion"
import Image from "next/image"
import { FloatingParticles } from "./FloatingParticles";

export function Testimonials() {
    const testimonials = [
        {
            name: "Sarah K.",
            role: "Former Barista → AI Developer",
            //   avatar: "/avatars/sarah.jpg",
            avatar: "https://i.pravatar.cc/150?img=32",
            content: "I went from $8/hour to $12,800/month debugging AI-generated code. The 'AI Code Review' module alone paid for this course 100x over.",
            stats: "347% Income Increase",
            progress: 92, // Visual indicator percentage
            verified: true
        },
        {
            name: "Raj P.",
            role: "IT Support → AI Consultant",
            //   avatar: "/avatars/raj.jpg",
            avatar: "https://i.pravatar.cc/150?img=12",
            content: "Landed 4 clients before finishing Section 3. The freelance scripts helped me charge premium rates for 'AI-to-Human' code conversion.",
            stats: "$27,500 in 60 Days",
            progress: 88,
            verified: true
        },
        {
            name: "Miguel T.",
            role: "College Dropout → Startup CTO",
            //   avatar: "/avatars/miguel.jpg",
            avatar: "https://i.pravatar.cc/150?img=45",
            content: "Built an algorithmic trading bot using Python+AI that secured $250k in funding. Never wrote a line of code before this course.",
            stats: "$250k Seed Round",
            progress: 95,
            verified: true
        }
    ]


    return (
        <section id="proof" className="py-24 bg-gradient-to-b from-primary to-[#0a1120] relative overflow-hidden">
            {/* Floating AI particles */}
            <FloatingParticles />
            {/* <div className="absolute inset-0 z-0 opacity-10">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 0, x: Math.random() * 100 }}
            animate={{ 
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 50 - 25]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute text-xs opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              color: i % 2 ? '#4ade80' : '#0ea5e9'
            }}
          >
            {i % 3 === 0 ? 'AI' : i % 3 === 1 ? 'Python' : '$'}
          </motion.div>
        ))}
      </div> */}

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header with Trust Indicators */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1 mb-6">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                        </span>
                        <span className="text-accent font-medium">1,842 TRANSFORMATIONS</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                        From <span className="text-accent">Zero</span> to <span className="text-accent">AI Hero</span>
                    </h2>

                    <p className="text-xl max-w-3xl mx-auto">
                        Real people who <span className="font-bold text-accent">commanded AI</span> instead of fearing it
                    </p>
                </motion.div>

                {/* Testimonial Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.15 }}
                            whileHover={{
                                y: -5,
                                boxShadow: "0 10px 25px -5px rgba(74, 222, 128, 0.2)"
                            }}
                            className="bg-primary/80 border border-secondary/20 rounded-2xl p-8 transition-all relative overflow-hidden"
                        >
                            {/* Verified Badge */}
                            {testimonial.verified && (
                                <div className="absolute -top-0 -right-0 bg-accent text-primary text-xs font-bold px-2 py-1 rounded-full flex items-center">
                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    VERIFIED
                                </div>
                            )}

                            {/* Success Story Label */}
                            <div className="text-center mb-6 -mt-2">
                                <span className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-bold">
                                    SUCCESS STORY
                                </span>
                            </div>

                            {/* Avatar & Info */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-accent">
                                    <Image
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-heading font-bold">{testimonial.name}</h4>
                                    <p className="text-sm opacity-80">{testimonial.role}</p>
                                </div>
                            </div>

                            {/* Testimonial Content */}
                            <blockquote className="text-lg italic mb-6 relative">
                                <span className="absolute -top-4 -left-4 text-4xl text-accent/30">&quot;</span>
                                {testimonial.content}
                                <span className="absolute -bottom-4 -right-4 text-4xl text-accent/30">&quot;</span>
                            </blockquote>

                            {/* Progress Indicator */}
                            <div className="mb-4">
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Transformation</span>
                                    <span>{testimonial.progress}%</span>
                                </div>
                                <div className="w-full bg-secondary/20 rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-accent to-emerald-300 h-2 rounded-full"
                                        style={{ width: `${testimonial.progress}%` }}
                                    />
                                </div>
                            </div>

                            {/* Stats Badge */}
                            <div className="px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent font-mono text-sm inline-flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                                </svg>
                                {testimonial.stats}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Trust Badges */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-6 mt-16 pt-8 border-t border-secondary/20"
                >
                    <div className="flex items-center gap-3 bg-primary/50 border border-secondary/20 rounded-full px-5 py-3">
                        <div className="text-accent text-2xl">✅</div>
                        <div>
                            <div className="font-bold">60-Day Guarantee</div>
                            <div className="text-sm opacity-80">Love it or get every penny back</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-primary/50 border border-secondary/20 rounded-full px-5 py-3">
                        <div className="text-accent text-2xl">👨‍💻</div>
                        <div>
                            <div className="font-bold">1,842 Students</div>
                            <div className="text-sm opacity-80">Transformed since 2023</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-primary/50 border border-secondary/20 rounded-full px-5 py-3">
                        <div className="text-accent text-2xl">⭐</div>
                        <div>
                            <div className="font-bold">4.9/5 Stars</div>
                            <div className="text-sm opacity-80">From 487 verified reviews</div>
                        </div>
                    </div>
                </motion.div>

                {/* Micro-CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <p className="text-xl mb-6">Your transformation could be next...</p>
                    <a
                        href="#cta"
                        className="inline-block bg-accent hover:bg-accent/90 text-primary font-heading font-bold px-8 py-4 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-accent/40"
                    >
                        👉 Start My AI-Powered Journey Now
                    </a>
                </motion.div>
            </div>
        </section>
    )
}