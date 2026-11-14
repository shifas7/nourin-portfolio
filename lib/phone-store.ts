import type { ScreenId } from "@/lib/content";

/** Where the floating phone should be, set by whichever section is in view. */
export type PhonePose = {
  screen: ScreenId;
  /** Horizontal position as a fraction of half the viewport width (-1 left, 1 right). */
  x: number;
  /** Vertical offset in the same units. */
  y: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  scale: number;
  /** When false the phone drops out of view. */
  visible: boolean;
};

export const phoneTarget: PhonePose = {
  screen: "reel",
  x: 0.5,
  y: 0,
  rotX: 0.06,
  rotY: -0.38,
  rotZ: 0.05,
  scale: 1.18,
  visible: true,
};

export function setPhonePose(pose: Partial<PhonePose>) {
  Object.assign(phoneTarget, pose);
}
