export function PartnerLogos() {
  return (
    <section className="py-12 border-y border-border/40 bg-black/20">
      <div className="container">
        <h2 className="text-center text-sm font-medium uppercase tracking-wider text-muted-foreground mb-8">
          Trusted by developers from
        </h2>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
          {["Google", "Microsoft", "Vercel", "GitHub", "Stripe", "AWS"].map((company) => (
            <div key={company} className="flex items-center justify-center">
              <div className="text-muted-foreground/70 hover:text-muted-foreground transition-colors text-sm md:text-base font-semibold">
                {company}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
