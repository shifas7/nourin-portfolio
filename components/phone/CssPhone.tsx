import PhoneScreen from "@/components/phone/PhoneScreen";
import { SCREEN_W, SCREEN_H } from "@/lib/screen";
import type { ScreenId } from "@/lib/content";

/**
 * Flat phone used on touch screens, small viewports and reduced motion,
 * where the WebGL phone is not mounted. Hidden once the 3D layer is active.
 */
export default function CssPhone({ screen, width = 280, className = "" }: { screen: ScreenId; width?: number; className?: string }) {
  const scale = width / SCREEN_W;
  return (
    <div
      aria-hidden
      className={`css-phone relative shrink-0 rounded-[48px] bg-[#1f1f23] p-[9px] shadow-[0_40px_80px_-30px_rgb(17_17_19/0.45),inset_0_0_0_1.5px_rgb(255_255_255/0.08)] ${className}`}
      style={{ width: width + 18 }}
    >
      <div className="overflow-hidden rounded-[40px]" style={{ width, height: SCREEN_H * scale }}>
        <div style={{ width: SCREEN_W, height: SCREEN_H, transform: `scale(${scale})`, transformOrigin: "top left" }}>
          <PhoneScreen id={screen} />
        </div>
      </div>
    </div>
  );
}
