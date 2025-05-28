// app/_components/python-dominance.tsx
export function PythonDominance() {
  const stats = [
    { value: "#1", label: "Most demanded language for AI" },
    { value: "75%", label: "Of AI projects use Python" },
    { value: "$120k", label: "Average Python + AI specialist salary" },
    { value: "2.1M", label: "New Python jobs by 2025" }
  ];

  return (
    <section className="py-24 bg-primary">
      <div className="container mx-auto px-page">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1">
            <h2 className="text-4xl font-heading font-bold mb-8">
              Why <span className="text-accent">Python</span> is the AI-Proof Skill
            </h2>
            
            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="text-accent text-2xl">✓</span>
                <div>
                  <h3 className="font-heading font-bold text-lg">ChatGPT&#39;s Native Tongue</h3>
                  <p>OpenAI&#39;s tools are built with Python - knowing it lets you customize AI outputs</p>
                </div>
              </li>
              {/* More list items... */}
            </ul>
          </div>
          
          <div className="flex-1 grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div 
                key={stat.label}
                className="bg-gradient-to-br from-secondary/10 to-primary border border-secondary/20 rounded-xl p-6 text-center"
              >
                <div className="font-heading font-bold text-accent text-4xl mb-2">
                  {stat.value}
                </div>
                <div className="opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}