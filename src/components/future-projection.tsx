// app/_components/future-projection.tsx
export function FutureProjection() {
  const timeline = [
    {
      time: "Today",
      state: "😨 Scared of AI",
      description: "Watches YouTube tutorials but never builds anything"
    },
    {
      time: "Day 30",
      state: "🤖 Using AI Tools",
      description: "Automates first project with Python + ChatGPT"
    },
    {
      time: "Day 60",
      state: "💸 First $1k Gig",
      description: "Lands freelance client fixing AI-generated code"
    },
    {
      time: "Month 6",
      state: "🚀 AI Consultant",
      description: "Earns $120/hr teaching businesses to implement AI"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#0a1120] to-primary">
      <div className="container mx-auto px-page">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-6">
          Where <span className="text-accent">Will You Be</span> in 6 Months?
        </h2>
        <p className="text-xl text-center mb-16 max-w-3xl mx-auto">
          Here&#39;s exactly what happens after you join <span className="font-bold text-accent">Python Power</span>:
        </p>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical timeline connector */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-accent to-secondary/20" />
          
          {timeline.map((item, index) => (
            <div key={index} className="relative pl-24 pb-16 last:pb-0 group">
              {/* Dot */}
              <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-accent border-4 border-primary z-10" />
              
              <div className="bg-primary/90 border border-secondary/20 rounded-xl p-8 group-hover:border-accent transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                  <span className="font-heading font-bold text-accent text-xl">{item.time}</span>
                  <span className="text-2xl">{item.state}</span>
                </div>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}