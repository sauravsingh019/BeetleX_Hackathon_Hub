import { motion } from 'framer-motion'

export function AboutSection() {
  return (
    <motion.section 
      aria-labelledby="about-heading" 
      className="py-20 mx-auto max-w-[1100px]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="text-center mb-12">
        <div className="text-[12px] uppercase tracking-[2px] text-accent font-semibold mb-3">About the Hackathon</div>
        <h2 id="about-heading" className="text-[clamp(1.6rem,3vw,2.4rem)] font-bold tracking-[-0.5px] text-text-primary mb-3">
          Built for Developers, By Developers
        </h2>
        <div className="text-[1rem] text-text-secondary max-w-[540px] mx-auto">
          No buzzwords. Just real engineers solving real problems in 72 hours. Open to all skill levels.
        </div>
      </div>
      
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
        <div className="bg-surface border border-border rounded-[18px] p-7 transition-colors hover:border-[var(--border2)]">
          <div className="text-[28px] mb-4">⚡</div>
          <h3 className="text-[1rem] font-semibold text-text-primary mb-2">72-Hour Sprint</h3>
          <p className="text-[14px] text-text-secondary leading-[1.6]">Three days of focused building. We handle food, wifi, and coffee — you handle the code.</p>
        </div>
        
        <div className="bg-surface border border-border rounded-[18px] p-7 transition-colors hover:border-[var(--border2)]">
          <div className="text-[28px] mb-4">🌍</div>
          <h3 className="text-[1rem] font-semibold text-text-primary mb-2">Global & Remote</h3>
          <p className="text-[14px] text-text-secondary leading-[1.6]">Participate from anywhere. Physical hub in Bangalore, remote access for everyone else.</p>
        </div>
        
        <div className="bg-surface border border-border rounded-[18px] p-7 transition-colors hover:border-[var(--border2)]">
          <div className="text-[28px] mb-4">🤝</div>
          <h3 className="text-[1rem] font-semibold text-text-primary mb-2">Team of 1–4</h3>
          <p className="text-[14px] text-text-secondary leading-[1.6]">Solo or squad — register alone and find teammates, or bring your crew ready to ship.</p>
        </div>
        
        <div className="bg-surface border border-border rounded-[18px] p-7 transition-colors hover:border-[var(--border2)]">
          <div className="text-[28px] mb-4">🏆</div>
          <h3 className="text-[1rem] font-semibold text-text-primary mb-2">Real Prizes</h3>
          <p className="text-[14px] text-text-secondary leading-[1.6]">$50,000 across 4 tracks. Plus investment conversations with our Web3 and AI portfolio.</p>
        </div>
      </div>
    </motion.section>
  )
}
