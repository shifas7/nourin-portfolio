import { useSyncExternalStore } from "react";

/** The project brief, shared by the form and the phone's live message preview. */
export type Brief = {
  name: string;
  email: string;
  services: string[];
  message: string;
};

let state: Brief = {
  name: "",
  email: "",
  services: [],
  message: "",
};

const listeners = new Set<() => void>();

export function updateBrief(patch: Partial<Brief>) {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
}

export function useBrief(): Brief {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => state,
    () => state,
  );
}

/** Plain-text brief, used for the email body and the phone preview. */
export function briefToText(b: Brief) {
  const who = b.name ? `I'm ${b.name}.` : "";
  const need = b.services.length ? `I need help with ${b.services.join(", ").toLowerCase()}.` : "";
  return ["Hi Nourin,", who, need, b.message].filter(Boolean).join(" ");
}
