"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Renders its children only once the placeholder comes within `margin` of the
 * viewport. Keeps below-the-fold phone screens out of the first render and out of
 * hydration, which is most of the page's main-thread cost on phones.
 */
export default function LazyMount({ children, margin = "600px" }: { children: React.ReactNode; margin?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  return (
    <div ref={ref} className="h-full w-full bg-[#0b0b0d]">
      {show ? children : null}
    </div>
  );
}
