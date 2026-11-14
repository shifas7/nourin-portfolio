"use client";

import { updateBrief } from "@/lib/brief-store";

export const AUDIT_SERVICE = "Free 15-min audit";

/**
 * Low-commitment CTA: preselects the free audit in the brief and jumps to the form.
 * Works as a plain anchor without JavaScript.
 */
export default function AuditButton({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <a
      href="#contact"
      data-track="cta_free_audit"
      onClick={() => updateBrief({ services: [AUDIT_SERVICE] })}
      className={className}
    >
      {children}
    </a>
  );
}
