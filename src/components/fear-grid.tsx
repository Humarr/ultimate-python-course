// app/_components/fear-grid.tsx
export function FearGrid() {
    const fears = [
        {
            icon: "🤖",
            title: "AI Writes Buggy Code",
            text: "ChatGPT makes mistakes you won't catch without Python knowledge",
            emoji: "❌"
        },
        {
            icon: "💸",
            title: "Freelancers Are Getting Rich",
            text: "Top 10% of Python devs earn $150/hr fixing AI-generated code",
            emoji: "📈"
        },
        {
            icon: "😨",
            title: "The Coming AI Divide",
            text: "By 2026, there will be two types of people: those who command AI, and those replaced by it",
            emoji: "⚡"
        },
        {
            icon: "👑",
            title: "Python = King of AI",
            text: "Every major AI tool (ChatGPT, Tesla Autopilot) runs on Python",
            emoji: "🐍"
        }
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-primary to-[#0f172a]">
            <div className="container mx-auto px-page">
                <h2 className="text-4xl md:text-6xl font-heading font-bold text-center mb-16">
                    The <span className="text-accent">Brutal Truth</span> About AI & Coding
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {fears.map((fear) => (
                        <div
                            key={fear.title}
                            className="bg-gradient-to-br from-primary to-secondary/10 border border-secondary/20 rounded-xl p-8 hover:border-accent/30 transition-all"
                        >
                            <div className="flex gap-4 items-start">
                                <span className="text-4xl">{fear.icon}</span>
                                <div>
                                    <h3 className="font-heading font-bold text-2xl mb-3">
                                        {fear.title} <span className="text-accent">{fear.emoji}</span>
                                    </h3>
                                    <p className="opacity-90">{fear.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    );
}