import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Nav from "@/components/Nav";
import Footer from "@/sections/Footer";
import CssPhone from "@/components/phone/CssPhone";
import { services, cases, profile, briefOptions } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  return {
    title: s.seoTitle,
    description: s.seoDescription,
    alternates: { canonical: `/services/${s.slug}` },
    // A page-level openGraph replaces the inherited one, so the share card is restated here.
    openGraph: {
      title: `${s.seoTitle} | ${profile.name}`,
      description: s.seoDescription,
      url: `/services/${s.slug}`,
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: s.h1 }],
    },
    twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
  };
}

const briefLink = (option: string) => `/?service=${encodeURIComponent(option)}#contact`;

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();
  const c = cases.find((x) => x.id === s.caseId)!;
  const others = services.filter((x) => x.slug !== s.slug);
  const url = `${SITE_URL}/services/${s.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: s.name,
      serviceType: s.name,
      description: s.seoDescription,
      url,
      areaServed: ["Kochi", "Kerala", "India"],
      provider: { "@type": "Person", name: profile.name, jobTitle: "Digital Marketer", url: SITE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: s.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/#services` },
        { "@type": "ListItem", position: 3, name: s.name, item: url },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav home={false} />
      <main id="main-content" className="mx-auto max-w-[1400px] px-4 pt-28 md:px-8">
        <nav aria-label="Breadcrumb" className="text-[14px] text-muted">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link href="/" className="tap link-draw pb-0.5 hover:text-fg">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/#services" className="tap link-draw pb-0.5 hover:text-fg">
                Services
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-fg">
              {s.name}
            </li>
          </ol>
        </nav>

        <section aria-labelledby="svc-title" className="grid grid-cols-1 items-center gap-12 py-14 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-7">
            <h1 id="svc-title" className="font-display text-[clamp(2.6rem,5.6vw,5.4rem)] leading-[0.95] text-fg [text-wrap:balance]">
              {s.h1}
            </h1>
            <p className="mt-7 max-w-[46ch] text-lg leading-relaxed text-muted md:text-xl">{s.intro}</p>
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <Link
                href={briefLink(s.briefOption)}
                data-track="cta_start_project"
                className="inline-flex h-13 items-center rounded-full bg-accent px-8 text-base font-semibold text-on-accent transition-transform duration-300 ease-out-expo hover:-translate-y-0.5 active:translate-y-px"
              >
                Start a project
              </Link>
              <Link href={briefLink(briefOptions.services[0])} data-track="cta_free_audit" className="tap link-draw pb-0.5 text-base text-fg">
                Or get a free 15-min audit
              </Link>
            </div>
          </div>
          <div className="flex justify-center lg:col-span-4 lg:col-start-9">
            <CssPhone screen={c.screen} width={230} />
          </div>
        </section>

        <section aria-labelledby="svc-includes" className="grid gap-10 border-t border-line py-16 md:grid-cols-12 md:gap-6">
          <h2 id="svc-includes" className="font-display text-3xl leading-tight text-fg md:col-span-4">
            What you get
          </h2>
          <div className="md:col-span-8">
            <p className="text-lg text-muted">Good for: {s.goodFor.toLowerCase()}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {s.includes.map((x) => (
                <li key={x} className="rounded-full border border-line px-5 py-2.5 text-[15px] text-fg">
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="svc-case" className="grid gap-10 border-t border-line py-16 md:grid-cols-12 md:gap-6">
          <h2 id="svc-case" className="font-display text-3xl leading-tight text-fg md:col-span-4">
            Proof
          </h2>
          <div className="rounded-[28px] bg-panel p-7 md:col-span-8 md:p-10">
            <p className="text-[15px] text-muted">
              {c.client} <span className="text-accent-ink">/ {c.service}</span>
            </p>
            <h3 className="font-display mt-3 text-[clamp(2rem,3.6vw,3.2rem)] leading-[0.98] text-fg">{c.title}</h3>
            <dl className="mt-8 grid gap-6 md:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-fg">The brief</dt>
                <dd className="mt-1.5 text-[16px] leading-relaxed text-muted">{c.brief}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-fg">What I did</dt>
                <dd className="mt-1.5 text-[16px] leading-relaxed text-muted">{c.did}</dd>
              </div>
            </dl>
            <p className="mt-8 flex flex-wrap items-baseline gap-x-3 border-t border-line pt-6">
              {c.resultValue && <span className="font-display text-5xl leading-none text-accent">{c.resultValue}</span>}
              <span className="text-[17px] text-fg">{c.result}</span>
            </p>
          </div>
        </section>

        <section aria-labelledby="svc-faq" className="grid gap-10 border-t border-line py-16 md:grid-cols-12 md:gap-6">
          <h2 id="svc-faq" className="font-display text-3xl leading-tight text-fg md:col-span-4">
            Questions clients ask
          </h2>
          <dl className="grid gap-8 md:col-span-8">
            {s.faqs.map((f) => (
              <div key={f.q}>
                <dt className="text-lg font-medium text-fg">{f.q}</dt>
                <dd className="mt-2 max-w-[62ch] text-[16px] leading-relaxed text-muted">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="svc-more" className="border-t border-line py-16">
          <h2 id="svc-more" className="font-display text-3xl leading-tight text-fg">
            Other ways I can help
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/services/${o.slug}`}
                  className="group flex h-full flex-col justify-between gap-8 rounded-[28px] bg-panel p-7 transition-transform duration-300 ease-out-expo hover:-translate-y-1"
                >
                  <span className="font-display text-2xl leading-tight text-fg">{o.name}</span>
                  <span className="inline-flex items-center gap-1.5 text-[15px] text-muted group-hover:text-fg">
                    See how <ArrowRight size={15} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-24 rounded-[28px] bg-fg px-6 py-14 text-bg md:px-14">
          <h2 className="font-display max-w-[18ch] text-[clamp(2.2rem,4.6vw,4rem)] leading-[0.98] [text-wrap:balance]">
            Want this working for your brand?
          </h2>
          <Link
            href={briefLink(s.briefOption)}
            data-track="cta_start_project"
            className="mt-8 inline-flex h-13 items-center gap-2 rounded-full bg-accent px-8 text-base font-semibold text-on-accent"
          >
            Start a project <ArrowUpRight size={18} weight="bold" />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
