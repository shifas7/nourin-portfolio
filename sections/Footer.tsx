import { ArrowUp } from "@phosphor-icons/react/dist/ssr";
import PhoneStation from "@/components/phone/PhoneStation";
import { profile } from "@/lib/content";

export default function Footer() {
  return (
    <PhoneStation as="div" pose={{ visible: false }} className="mx-auto max-w-[1400px] px-4 pb-8 md:px-8">
      <footer className="flex flex-col gap-4 border-t border-line pt-8 text-[15px] md:flex-row md:items-center md:justify-between">
        <p className="text-muted">
          © {new Date().getFullYear()} {profile.name}. Digital marketer, {profile.location}.
        </p>
        <a href="#top" className="link-draw inline-flex items-center gap-1 self-start pb-0.5 text-fg">
          Back to top <ArrowUp size={14} />
        </a>
      </footer>
    </PhoneStation>
  );
}
