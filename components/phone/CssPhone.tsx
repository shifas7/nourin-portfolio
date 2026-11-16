import PhoneScreen from "@/components/phone/PhoneScreen";
import { SCREEN_W, SCREEN_H } from "@/lib/screen";
import type { ScreenId } from "@/lib/content";
import LazyMount from "@/components/phone/LazyMount";

/**
 * Flat phone used on touch screens, small viewports and reduced motion,
 * where the WebGL phone is not mounted. Hidden once the 3D layer is active.
 *
 * Sized by --pw (screen width in px, unitless), derived in CSS from --pw-base / --pw-sm, so one phone can
 * change size per breakpoint instead of rendering a second copy. `width` sets the
 * default; `smWidth` overrides it from the sm breakpoint up.
 * content-visibility lets the browser skip laying out phones that are off screen.
 */
export default function CssPhone({
  screen,
  width = 280,
  smWidth,
  eager = false,
  className = "",
}: {
  screen: ScreenId;
  width?: number;
  smWidth?: number;
  /** Render the screen immediately (above the fold). Others mount when near view. */
  eager?: boolean;
  className?: string;
}) {
  const vars = { "--pw-base": width, ...(smWidth ? { "--pw-sm": smWidth } : {}) } as React.CSSProperties;
  return (
    <div
      aria-hidden
      className={`css-phone relative w-fit shrink-0 rounded-[48px] bg-[#1f1f23] p-[9px] shadow-[0_40px_80px_-30px_rgb(17_17_19/0.45),inset_0_0_0_1.5px_rgb(255_255_255/0.08)] ${
        smWidth ? "css-phone-responsive" : ""
      } ${className}`}
      style={vars}
    >
      <div
        className="overflow-hidden rounded-[40px]"
        style={{ width: "calc(var(--pw) * 1px)", height: `calc(var(--pw) * ${SCREEN_H / SCREEN_W}px)` }}
      >
        <div
          style={{
            width: SCREEN_W,
            height: SCREEN_H,
            transform: `scale(calc(var(--pw) / ${SCREEN_W}))`,
            transformOrigin: "top left",
          }}
        >
          {eager ? (
            <PhoneScreen id={screen} />
          ) : (
            <LazyMount>
              <PhoneScreen id={screen} />
            </LazyMount>
          )}
        </div>
      </div>
    </div>
  );
}
