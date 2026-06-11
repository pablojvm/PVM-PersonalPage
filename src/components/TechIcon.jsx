import { useState } from "react";

const normalizeHex = (c) => {
  if (!c) return null;
  return c.startsWith("#") ? c.toUpperCase() : `#${c.toUpperCase()}`;
};

const hexForUrl = (c) => (c ? c.replace(/^#/, "").toUpperCase() : undefined);

/**
 * TechIcon
 *
 * Renders a brand logo using one of four strategies (in priority order):
 *  1. `iconUrl`  — arbitrary URL (Iconify, etc.)
 *  2. `slug`     — Simple Icons CDN tinted with `color`
 *  3. `path`     — inline SVG path tinted with `color`
 *  4. fallback   — circle with the first letter of the brand
 */
const TechIcon = ({ tech, size = 56, className = "" }) => {
  const [imgError, setImgError] = useState(false);

  const fillColor = normalizeHex(tech.color) || "currentColor";
  const colorForUrl = hexForUrl(tech.color);

  // 1) iconUrl ──────────────────────────────────────────────────────────────
  if (tech.iconUrl && !imgError) {
    const styleWhiteBg =
      tech.color && tech.color.replace?.(/^#?/, "")?.toUpperCase() === "FFFFFF"
        ? { background: "rgba(255,255,255,0.08)", padding: 8, borderRadius: 8 }
        : undefined;

    return (
      <img
        src={tech.iconUrl}
        alt={`${tech.name} logo`}
        width={size}
        height={size}
        className={`object-contain ${className}`}
        style={{ width: size, height: size, ...styleWhiteBg }}
        onError={() => setImgError(true)}
        loading="lazy"
      />
    );
  }

  // 2) slug → Simple Icons CDN ──────────────────────────────────────────────
  if (tech.slug && !imgError) {
    const cdnUrl = colorForUrl
      ? `https://cdn.simpleicons.org/${tech.slug}/${colorForUrl}`
      : `https://cdn.simpleicons.org/${tech.slug}`;

    const styleWhiteBg =
      tech.color && tech.color.replace?.(/^#?/, "")?.toUpperCase() === "FFFFFF"
        ? { background: "rgba(255,255,255,0.08)", padding: 8, borderRadius: 8 }
        : undefined;

    return (
      <img
        src={cdnUrl}
        alt={`${tech.name} logo`}
        width={size}
        height={size}
        className={`object-contain ${className}`}
        style={{ width: size, height: size, ...styleWhiteBg }}
        onError={(e) => {
          e.currentTarget.style.display = "none";
          setImgError(true);
        }}
        loading="lazy"
      />
    );
  }

  // 3) inline SVG path (OpenAI, Anthropic) ──────────────────────────────────
  if (tech.path) {
    return (
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        className={className}
        role="img"
        aria-label={`${tech.name} logo`}
      >
        <path d={tech.path} fill={fillColor} />
      </svg>
    );
  }

  // 4) fallback — initials circle ───────────────────────────────────────────
  const initial = (tech.name || "?").slice(0, 1).toUpperCase();
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-slate-200 text-slate-700 ${className}`}
      style={{ width: size, height: size }}
      title={tech.name}
      aria-hidden="false"
    >
      <span className="font-semibold">{initial}</span>
    </div>
  );
};

export default TechIcon;
