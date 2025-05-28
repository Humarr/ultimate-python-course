// app/_components/final-cta.tsx
import CountdownTimer from "./CountdownTimer"

export function FinalCta() {
    return (
        <section id="cta" className="relative py-32 overflow-hidden bg-gradient-to-b from-primary to-accent">
            {/* <section id="cta" className="relative py-32 overflow-hidden bg-gradient-to-b from-primary to-secondary"> */}
            {/* Animated background elements */}
            <div className="absolute inset-0 z-0 opacity-10">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-accent/20 blur-3xl" />
                <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-secondary/20 blur-3xl" />
            </div>

            <div className="container mx-auto px-page text-center relative z-10">
                <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8">
                    The <span className="text-accent">AI Revolution</span> is Here
                </h2>
                <p className="text-xl max-w-3xl mx-auto mb-12">
                    Will you be the one <span className="font-bold">giving orders to AI</span>, or watching others profit while you struggle?
                </p>

                <div className="max-w-2xl mx-auto bg-gradient-to-br from-primary to-secondary/10 border border-accent/30 rounded-xl p-8 shadow-xl">
                    <div className="font-heading font-bold text-2xl mb-4">
                        Python Power Enrollment
                    </div>
                    <div className="text-5xl font-heading font-bold text-accent mb-6">
                        &#8358;90,000
                    </div>

                    <ul className="space-y-4 mb-8 text-left max-w-md mx-auto">
                        {[
                            "60-day AI-proof Python mastery",
                            "Hands-on AI coding projects with real-world impact",
                            "Freelance-ready skills to land your first high-paying gig",
                            "Personalized AI-powered debugging techniques",
                            "Access to exclusive community & ongoing support",
                            "Step-by-step career coaching for tech success"
                        ].map((benefit, idx) => (
                            <li
                                key={idx}
                                className="flex items-center gap-3 cursor-default text-white font-medium
                 opacity-0 animate-fadeInUp"
                                style={{ animationDelay: `${idx * 150}ms`, animationFillMode: "forwards" }}
                            >
                                <svg
                                    className="w-6 h-6 text-accent flex-shrink-0 animate-bounce"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                <span>{benefit}</span>
                            </li>
                        ))}
                    </ul>


                    <a
                        href="/checkout"
                        className="inline-block bg-accent hover:bg-accent/90 text-primary font-heading font-bold px-12 py-4 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-accent/40 mb-4"
                    >
                        👉 Yes! I Want AI Command Power
                    </a>

                    <div className="text-sm opacity-80">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            60-Day Money-Back Guarantee
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            Enrollment closes in: <span className="font-mono font-bold"><CountdownTimer /></span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}