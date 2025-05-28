// app/_components/hero.tsx
import { FloatingParticles } from './FloatingParticles'
export function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-primary  pt-20">
            {/* <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary to-[#0f172a]"> */}
            {/* Particle background */}
            <div className="absolute inset-0 z-0 opacity-70">
                <div className="absolute top-20 left-1/4 w-2 h-2 bg-accent rounded-full animate-float" />
                {/* More floating code particles... */}
                <FloatingParticles numberOfParticles={40} />
            </div>

            <div className="container mx-auto text-center px-page z-10">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-extrabold leading-tight mb-8">
                    <span className="text-danger animate-pulse">🚨 WARNING:</span>{" "}
                    <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                        AI Didn&#39;t Kill Coding
                    </span>
                </h1>

                <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12">
                    Here&#39;s why learning <span className="font-bold text-accent">Python in 2024</span> makes you{" "}
                    <span className="underline decoration-accent">AI-Proof</span> (+ how to turn ChatGPT into your{" "}
                    <span className="italic">$120/hour</span> code slave)
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="#offer"
                        className="bg-accent hover:bg-accent/90 text-primary font-heading font-bold px-8 py-4 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-accent/40"
                    >
                        👉 Yes! I Want AI Command Power
                    </a>
                    <a
                        href="#proof"
                        className="border-2 border-secondary hover:border-accent text-white font-medium px-8 py-4 rounded-full transition-all"
                    >
                        🤔 Show Me Proof First
                    </a>
                </div>

                <div className="mt-16 mx-auto max-w-4xl bg-black/50 border border-emerald-400/20 rounded-lg p-6 font-mono text-left">
                    <div className="text-accent">$ python future_income.py</div>
                    <div className="text-white"> Your 2025 salary: <span className="text-accent font-bold">$12,500/month</span></div>
                </div>
            </div>
        </section>
    );
}