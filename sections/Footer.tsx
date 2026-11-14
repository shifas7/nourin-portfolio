import Link from "next/link";
import { ArrowUp } from "@phosphor-icons/react/dist/ssr";
import PhoneStation from "@/components/phone/PhoneStation";
import { profile, services } from "@/lib/content";

export default function Footer() {
  return (
    <PhoneStation as="div" pose={{ visible: false }} className="mx-auto max-w-[1400px] px-4 pb-24 md:px-8 lg:pb-8">
      <footer className="border-t border-line pt-8 text-[15px]">
        <nav aria-label="Services">
          <ul className="flex flex-wrap gap-x-6 gap-y-4">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="tap link-draw pb-0.5 text-fg">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-muted">
            © {new Date().getFullYear()} {profile.name}. Digital marketer, {profile.location}.
          </p>
          <a href="#main-content" className="tap link-draw inline-flex items-center gap-1 self-start pb-0.5 text-fg">
            Back to top <ArrowUp size={14} />
          </a>
        </div>
      </footer>
    </PhoneStation>
  );
}
