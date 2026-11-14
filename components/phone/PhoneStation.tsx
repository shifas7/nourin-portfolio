"use client";

import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { setPhonePose, type PhonePose } from "@/lib/phone-store";

gsap.registerPlugin(ScrollTrigger);

/**
 * Wrap any block of the page: while it holds the middle of the viewport,
 * the floating phone moves to this pose and shows this screen.
 */
export default function PhoneStation({
  pose,
  children,
  className = "",
  as = "div",
  id,
  labelledBy,
}: {
  pose: Partial<PhonePose>;
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
  id?: string;
  labelledBy?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const poseKey = JSON.stringify(pose);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const p = JSON.parse(poseKey) as Partial<PhonePose>;
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 55%",
      end: "bottom 45%",
      onToggle: (self) => self.isActive && setPhonePose({ visible: true, ...p }),
    });
    return () => st.kill();
  }, [poseKey]);

  const Tag = as;
  return (
    <Tag ref={ref as React.Ref<never>} id={id} aria-labelledby={labelledBy} className={className}>
      {children}
    </Tag>
  );
}
