const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div aria-hidden className="pointer-events-none absolute inset-0 border-b border-line bg-bg/85 backdrop-blur-md" />
      <nav aria-label="Primary" className="relative mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 md:px-8">
        <a href="#top" className="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight text-fg">
          <span aria-hidden className="h-7 w-7 overflow-hidden rounded-full bg-panel">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/nourin-square.jpg" alt="" className="h-full w-full object-cover object-[50%_30%]" />
          </span>
          Nourin Nassar
        </a>
        <div className="flex items-center gap-7">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="link-draw hidden pb-0.5 text-[15px] text-fg md:inline">
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="inline-flex h-10 items-center rounded-full bg-fg px-5 text-[15px] font-medium text-bg transition-transform duration-300 ease-out-expo hover:-translate-y-0.5 active:translate-y-px"
          >
            Start a project
          </a>
        </div>
      </nav>
    </header>
  );
}
