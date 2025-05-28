// app/_components/offer-section.tsx
export function OfferSection() {
    const bonuses = [
        {
            title: "ChatGPT Code Prompt Kit",
            description: "50+ proven prompts to generate perfect Python code"
        },
        {
            title: "AI Debugging Playbook",
            description: "Exactly how to spot and fix AI's coding mistakes"
        },
        {
            title: "$500 Freelance Blueprint",
            description: "Land your first client before finishing the course"
        }
    ];

    return (
        <section id="offer" className="py-24 bg-[#0a1120]">
            <div className="container mx-auto px-page">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                        The <span className="text-accent">Python Power</span> Blueprint
                    </h2>
                    <p className="text-xl">
                        Everything you need to go from &quot;AI scared&quot; to &quot;AI empowered&quot; in 60 days
                    </p>
                </div>

                <div className="bg-gradient-to-br from-primary to-secondary/10 border border-accent/30 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(74,222,128,0.15)]">
                    <div className="p-12">
                        <div className="flex flex-col md:flex-row gap-12">
                            <div className="flex-1">
                                <h3 className="font-heading font-bold text-3xl mb-6">
                                    What&#39;s Inside:
                                </h3>

                                <ul className="space-y-6">
                                    <li className="flex gap-4">
                                        <span className="text-accent text-2xl">✦</span>
                                        <div>
                                            <h4 className="font-bold">Module 1: Python Fundamentals</h4>
                                            <p>Variables, loops, functions - but taught through AI collaboration</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="text-accent text-2xl">✦</span>
                                        <div>
                                            <h4 className="font-bold">Module 2: Automating Boring Stuff</h4>
                                            <p>Learn to automate tasks like file cleanup, email sending, and reports—plus how to supercharge it with ChatGPT.</p>
                                        </div>
                                    </li>

                                    <li className="flex gap-4">
                                        <span className="text-accent text-2xl">✦</span>
                                        <div>
                                            <h4 className="font-bold">Module 3: Working with Real Data</h4>
                                            <p>Read CSVs, scrape websites, and analyze data using Pandas—with AI helping clean and visualize your data.</p>
                                        </div>
                                    </li>

                                    <li className="flex gap-4">
                                        <span className="text-accent text-2xl">✦</span>
                                        <div>
                                            <h4 className="font-bold">Module 4: Debugging & AI Pair Programming</h4>
                                            <p>Learn how to find bugs fast—and use ChatGPT as your real-time debugging partner.</p>
                                        </div>
                                    </li>

                                    <li className="flex gap-4">
                                        <span className="text-accent text-2xl">✦</span>
                                        <div>
                                            <h4 className="font-bold">Module 5: Building Python Projects</h4>
                                            <p>Create real-world tools like a weather app, a to-do tracker, or a stock price notifier—with help from AI prompts.</p>
                                        </div>
                                    </li>

                                    <li className="flex gap-4">
                                        <span className="text-accent text-2xl">✦</span>
                                        <div>
                                            <h4 className="font-bold">Module 6: Intro to APIs & AI Integration</h4>
                                            <p>Use Python to pull data from APIs (like OpenAI or weather APIs) and build smart, interactive scripts.</p>
                                        </div>
                                    </li>

                                    <li className="flex gap-4">
                                        <span className="text-accent text-2xl">✦</span>
                                        <div>
                                            <h4 className="font-bold">Module 7: From Script to Side Hustle</h4>
                                            <p>Learn how to turn your Python skills into freelance income—writing scripts for real-world clients or side projects.</p>
                                        </div>
                                    </li>

                                    {/* More modules... */}
                                </ul>
                            </div>

                            <div className="flex-1">
                                <div className="bg-primary/80 border border-secondary/20 rounded-xl p-8 mb-8">
                                    <h3 className="font-heading font-bold text-2xl mb-4 text-center">
                                        Start Today
                                    </h3>
                                    <div className="text-5xl font-heading font-bold text-center mb-6">
                                        &#8358;90,000

                                    </div>
                                    <a
                                        href="#cta"
                                        className="block w-full bg-accent hover:bg-accent/90 text-primary font-heading font-bold text-center py-4 px-6 rounded-lg mb-6 transition-all transform hover:scale-[1.02]"
                                    >
                                        Enroll Now
                                    </a>
                                    <div className="text-center text-sm opacity-80">
                                        One-time payment • 60-day guarantee
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-primary/50 border-t border-secondary/20 p-12">
                        <h3 className="font-heading font-bold text-2xl mb-6 text-center">
                            🎁 Exclusive Bonuses (Limited Time)
                        </h3>

                        <div className="grid md:grid-cols-3 gap-6">
                            {bonuses.map((bonus) => (
                                <div
                                    key={bonus.title}
                                    className="bg-gradient-to-br from-secondary/10 to-primary border border-secondary/20 rounded-xl p-6 hover:border-accent transition-all"
                                >
                                    <div className="font-heading font-bold text-lg mb-2">
                                        {bonus.title}
                                    </div>
                                    <p className="opacity-90 text-sm">{bonus.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}