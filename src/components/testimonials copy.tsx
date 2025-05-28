'use client';
// app/_components/testimonials.tsx
import { motion } from "framer-motion"
import Image from "next/image";

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah K.",
      role: "Former Barista → Python Freelancer",
      avatar: "/avatars/sarah.jpg",
      content: "I went from making $8/hour to $120/hour debugging AI code. This course taught me how to spot ChatGPT's mistakes and fix them like a pro.",
      stats: "$12,800/month"
    },
    {
      name: "Raj P.",
      role: "IT Support → AI Consultant",
      avatar: "/avatars/raj.jpg",
      content: "Landing my first client before finishing the course paid for the program 3x over. The freelance blueprint alone is worth $10k.",
      stats: "4 New Clients"
    },
    {
      name: "Miguel T.",
      role: "College Dropout → Startup CTO",
      avatar: "/avatars/miguel.jpg",
      content: "Used the Python+AI skills to build an automated trading bot that got me funding. Never thought I could code before this.",
      stats: "$250k Seed Round"
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-primary to-[#0a1120]">
      <div className="container mx-auto px-page">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            From <span className="text-accent">Zero</span> to <span className="text-accent">AI Hero</span>
          </h2>
          <p className="text-xl max-w-3xl mx-auto">
            Don&#39;t take our word for it - see what happens when ordinary people <span className="font-bold">command AI instead of fearing it</span>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-primary/80 border border-secondary/20 rounded-2xl p-8 hover:border-accent/50 transition-all"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-accent">
                  {/* Next.js Image component for optimized avatars */}
                  <Image 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                    width={56}
                    height={56}
                  />
                </div>
                <div>
                  <h4 className="font-heading font-bold">{testimonial.name}</h4>
                  <p className="text-sm opacity-80">{testimonial.role}</p>
                </div>
              </div>
              
              <blockquote className="text-lg italic mb-6">
                &quot;{testimonial.content}&quot;
              </blockquote>
              
              <div className="px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent font-mono text-sm inline-block">
                ▲ {testimonial.stats}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 mt-16 pt-8 border-t border-secondary/20"
        >
          <div className="flex items-center gap-2">
            <div className="text-2xl">✅</div>
            <span>60-Day Money-Back Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-2xl">👨‍💻</div>
            <span>1,842 Students Transformed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-2xl">⭐</div>
            <span>4.9/5 (487 Reviews)</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}