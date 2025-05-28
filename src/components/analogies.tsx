// app/_components/analogies.tsx
export function Analogies() {
  const analogies = [
    {
      title: "The Calculator Myth",
      content: "Did calculators kill math? No – they made mathematicians 10x more powerful. AI does the same for coding.",
      icon: "🧮"
    },
    {
      title: "Chef vs. Microwave",
      content: "AI is like a microwave in the kitchen. It can heat up leftovers fast, but it can’t cook a gourmet meal from scratch. For that, you still need a real chef—you. 🍽️👨‍🍳.",
    //   content: "AI is a microwave for code. It can rehash what exists, but can't create Michelin-star solutions.",
      icon: "👨‍🍳"
    },
    {
      title: "Self-Driving Car Reality",
      content: "Teslas still need engineers. When AI fails (and it will), you need to take the wheel.",
      icon: "🚗"
    }
  ];

  return (
    <section className="py-24 bg-[#0a1120]">
      <div className="container mx-auto px-page">
        <h2 className="text-4xl font-heading font-bold text-center mb-16">
          Why <span className="text-accent">AI Makes Coders</span> More Valuable
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {analogies.map((analogy) => (
            <div 
              key={analogy.title}
              className="bg-primary/80 border border-secondary/20 rounded-xl p-8 hover:border-accent/50 transition-all hover:translate-y-[-8px]"
            >
              <div className="text-5xl mb-6">{analogy.icon}</div>
              <h3 className="font-heading font-bold text-xl mb-4">{analogy.title}</h3>
              <p className="opacity-90">{analogy.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}