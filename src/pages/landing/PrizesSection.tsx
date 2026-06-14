export function PrizesSection() {
  return (
    <div>
      <div className="text-[12px] uppercase tracking-[2px] text-accent font-semibold mb-4">Prizes & Tracks</div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        <div className="bg-surface border border-warning/40 rounded-[18px] p-6 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-warning"></div>
          <div className="text-[11px] uppercase tracking-[1px] text-text-tertiary text-text3 mb-2">🥇 Grand Prize</div>
          <div className="text-[2rem] font-bold text-text-primary tracking-[-1px]">$20K</div>
          <div className="text-[12px] text-text-secondary mt-2">Open Track</div>
        </div>
        
        <div className="bg-surface border border-border rounded-[18px] p-6 text-center relative overflow-hidden">
          <div className="text-[11px] uppercase tracking-[1px] text-text-tertiary text-text3 mb-2">🥈 Runner Up</div>
          <div className="text-[2rem] font-bold text-text-primary tracking-[-1px]">$10K</div>
          <div className="text-[12px] text-text-secondary mt-2">Open Track</div>
        </div>
        
        <div className="bg-surface border border-border rounded-[18px] p-6 text-center relative overflow-hidden">
          <div className="text-[11px] uppercase tracking-[1px] text-text-tertiary text-text3 mb-2">🏅 AI Track</div>
          <div className="text-[2rem] font-bold text-text-primary tracking-[-1px]">$10K</div>
          <div className="text-[12px] text-text-secondary mt-2">AI / ML</div>
        </div>
        
        <div className="bg-surface border border-border rounded-[18px] p-6 text-center relative overflow-hidden">
          <div className="text-[11px] uppercase tracking-[1px] text-text-tertiary text-text3 mb-2">🏅 Web3 Track</div>
          <div className="text-[2rem] font-bold text-text-primary tracking-[-1px]">$10K</div>
          <div className="text-[12px] text-text-secondary mt-2">Blockchain</div>
        </div>
      </div>
    </div>
  )
}
