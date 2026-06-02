import { motion as Motion } from "framer-motion";

/**
 * HeroNav
 *
 * iOS-style segmented control with a sliding "liquid glass" pill that
 * marks the active section. The pill animates between options using
 * framer-motion's shared layoutId, so transitions feel like the iOS
 * 26 Liquid Glass aesthetic: blurred glass surface, gentle spring,
 * inner highlight, soft outer shadow.
 *
 * Props:
 *   - items: [{ id, label, ariaLabel? }]
 *   - activeId: id of the currently active item
 *   - onSelect(id): called when the user clicks an item
 *
 * The active state is controlled by the parent so it can track scroll
 * position via IntersectionObserver.
 */
const HeroNav = ({ items, activeId, onSelect }) => (
  <div
    role="tablist"
    aria-label="Section navigation"
    className="
      relative inline-flex items-center gap-0.5 p-1
      rounded-full
      bg-white/[0.08] backdrop-blur-2xl
      border border-white/[0.14]
      shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),0_12px_40px_-12px_rgba(0,0,0,0.55)]
      theme-light:bg-white/55 theme-light:border-black/[0.06]
      theme-light:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.95),0_8px_28px_-8px_rgba(15,23,42,0.18)]
    "
  >
    {items.map((item) => {
      const isActive = item.id === activeId;
      return (
        <button
          key={item.id}
          type="button"
          role="tab"
          aria-selected={isActive}
          aria-label={item.ariaLabel || item.label}
          onClick={() => onSelect?.(item.id)}
          className="relative px-3.5 sm:px-5 py-2 text-sm font-medium whitespace-nowrap rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        >
          {isActive ? (
            <Motion.span
              layoutId="hero-nav-active"
              aria-hidden="true"
              className="
                absolute inset-0 rounded-full
                bg-gradient-to-b from-white/[0.28] to-white/[0.10]
                border border-white/[0.22]
                shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),0_2px_10px_-2px_rgba(0,0,0,0.3)]
                theme-light:from-white theme-light:to-white/70
                theme-light:border-black/[0.05]
                theme-light:shadow-[inset_0_1px_0_0_rgba(255,255,255,1),0_2px_8px_-2px_rgba(15,23,42,0.18)]
              "
              transition={{ type: "spring", bounce: 0.18, duration: 0.55 }}
            />
          ) : null}
          <span
            className={`relative transition-colors duration-200 ${
              isActive
                ? "text-white theme-light:text-slate-900"
                : "text-white/65 hover:text-white theme-light:text-slate-600 theme-light:hover:text-slate-900"
            }`}
          >
            {item.label}
          </span>
        </button>
      );
    })}
  </div>
);

export default HeroNav;
