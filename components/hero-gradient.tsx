export function HeroGradient() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-0 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-gradient-to-tr from-primary to-purple-500 opacity-20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/4 bottom-0 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-blue-500 to-primary opacity-20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute right-1/4 top-1/2 -z-10 h-[250px] w-[250px] -translate-y-1/2 rounded-full bg-gradient-to-tr from-purple-500 to-primary opacity-20 blur-3xl"
        aria-hidden="true"
      />
    </>
  )
}
