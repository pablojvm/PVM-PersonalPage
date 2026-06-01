import { Fragment } from "react";
import { motion as Motion } from "framer-motion";

/**
 * TechOrchestration
 *
 * Linear progressive diagram of the tech stack used in a project, showing
 * the orchestration order from left to right. Each node has an icon, a
 * label and a role description. Connected by animated arrows.
 *
 * Props:
 *   - title: string shown above the diagram
 *   - steps: array of { icon, label, role }
 *   - accent: tailwind gradient class fragment (e.g. "from-cyan-400 to-blue-500")
 *
 * Renders all icons inline (no network) for reliability. Brand logos use
 * their CC0 / fair-use SVG paths (Simple Icons). Concept icons use Heroicons
 * stroke style.
 */

const BrandIcon = ({ name }) => {
  const common = "w-7 h-7";
  switch (name) {
    case "powerbi":
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="#F2C811"
            d="M11.001 24V4l5.998-1.99v19.973L11.001 24zm6.999-1.987V2.013L24 0v19.997l-6 2.016zm-13 .013L0 21.014v-15l5-1.667v17.679z"
          />
        </svg>
      );
    case "n8n":
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <g fill="#EA4B71">
            <circle cx="4" cy="12" r="2.2" />
            <circle cx="12" cy="6" r="2.2" />
            <circle cx="12" cy="18" r="2.2" />
            <circle cx="20" cy="12" r="2.2" />
            <path d="M4.5 11.5h7v1H4.5zM12.5 6.5l7 5-.6.8-7-5zM12.5 17.5l7-5 .6.8-7 5z" />
          </g>
        </svg>
      );
    case "mongodb":
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="#47A248"
            d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"
          />
        </svg>
      );
    case "postgresql":
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <ellipse cx="12" cy="5.5" rx="7" ry="2.3" fill="#336791" />
          <path d="M5 5.5v6c0 1.27 3.13 2.3 7 2.3s7-1.03 7-2.3v-6" fill="#336791" />
          <path d="M5 11.5v7c0 1.27 3.13 2.3 7 2.3s7-1.03 7-2.3v-7" fill="#336791" />
          <ellipse cx="12" cy="11.5" rx="7" ry="2.3" fill="none" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="0.6" />
          <text
            x="12"
            y="19.4"
            textAnchor="middle"
            fontSize="6.2"
            fontFamily="ui-monospace, SFMono-Regular, monospace"
            fontWeight="700"
            fill="#FFFFFF"
          >
            PG
          </text>
        </svg>
      );
    case "docker":
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="#2496ED"
            d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.185-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"
          />
        </svg>
      );
    case "openai":
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="#EAEAEA"
            d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zM3.6087 18.3036a4.4708 4.4708 0 0 1-.5346-3.0137l.1419.0852 4.7783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1313-1.6466zM2.3408 7.8956a4.485 4.485 0 0 1 2.3654-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7866A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654 2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.5093-2.6067-1.4998Z"
          />
        </svg>
      );
    case "twilio":
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="#F22F46"
            d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 21.6c-5.3 0-9.6-4.3-9.6-9.6S6.7 2.4 12 2.4s9.6 4.3 9.6 9.6-4.3 9.6-9.6 9.6zm5.9-12.5a1.7 1.7 0 11-1.7-1.7 1.7 1.7 0 011.7 1.7zm0 5.8a1.7 1.7 0 11-1.7-1.7 1.7 1.7 0 011.7 1.7zm-5.8 0a1.7 1.7 0 11-1.7-1.7 1.7 1.7 0 011.7 1.7zm0-5.8a1.7 1.7 0 11-1.7-1.7 1.7 1.7 0 011.7 1.7z"
          />
        </svg>
      );
    default:
      return null;
  }
};

const Heroicon = ({ name }) => {
  const common = "w-6 h-6";
  const props = {
    className: common,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  switch (name) {
    case "webhook":
      return (
        <svg {...props}>
          <path d="M13 10V3L4 14h7v7l9-11h-7z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "api":
      return (
        <svg {...props}>
          <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
        </svg>
      );
    case "webapp":
      return (
        <svg {...props}>
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      );
    case "sparkles":
      return (
        <svg {...props}>
          <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3zM18 14l.9 2.5L21 17l-2.1.5L18 20l-.9-2.5L15 17l2.1-.5L18 14z" />
        </svg>
      );
    case "upload":
      return (
        <svg {...props}>
          <path d="M12 16V4m0 0l-4 4m4-4l4 4M4 20h16" />
        </svg>
      );
    case "ocr":
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3M8 11h6M8 8h4" />
        </svg>
      );
    case "check":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12.5l2.8 2.8L16 9.5" />
        </svg>
      );
    case "pdf":
      return (
        <svg {...props}>
          <path d="M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" />
          <path d="M14 3v6h6" />
          <text x="8.5" y="18" fontSize="5" fontFamily="monospace" fill="currentColor" stroke="none" fontWeight="700">
            PDF
          </text>
        </svg>
      );
    case "microphone":
      return (
        <svg {...props}>
          <rect x="9" y="3" width="6" height="12" rx="3" />
          <path d="M5 11a7 7 0 0014 0M12 18v3M8 21h8" />
        </svg>
      );
    case "users":
      return (
        <svg {...props}>
          <circle cx="9" cy="8" r="3.2" />
          <path d="M2.5 20a6.5 6.5 0 0113 0M17 11a3 3 0 100-6M16 20a5.5 5.5 0 015.5-5.5" />
        </svg>
      );
    case "ticket":
      return (
        <svg {...props}>
          <path d="M3 8a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 100-4V8z" />
          <path d="M14 6v12" strokeDasharray="2 2" />
        </svg>
      );
    default:
      return null;
  }
};

const IconBubble = ({ icon }) => {
  const isBrand = ["powerbi", "n8n", "mongodb", "postgresql", "docker", "openai", "twilio"].includes(icon);
  return (
    <div
      className={`relative w-14 h-14 rounded-xl flex items-center justify-center shadow-md
                  bg-slate-900/70 border border-white/20
                  theme-light:bg-white theme-light:border-slate-200`}
    >
      {isBrand ? (
        <BrandIcon name={icon} />
      ) : (
        <div className="text-purple-200 theme-light:text-purple-600">
          <Heroicon name={icon} />
        </div>
      )}
    </div>
  );
};

const TechOrchestration = ({ title, steps, accent = "from-purple-400 to-pink-400" }) => {
  if (!Array.isArray(steps) || steps.length === 0) return null;

  return (
    <div
      className="rounded-xl border border-white/15 bg-white/5 p-4 md:p-6
                 theme-light:bg-white theme-light:border-slate-200"
    >
      <div className="flex items-center gap-2 mb-5">
        <span className={`inline-block w-1.5 h-4 rounded-sm bg-gradient-to-b ${accent}`} />
        <p className="text-[11px] uppercase tracking-wider text-white/70 font-semibold theme-light:text-slate-600">
          {title}
        </p>
      </div>

      {/* Steps row — wraps on narrow screens */}
      <div className="flex flex-wrap items-stretch justify-center gap-3 md:gap-2">
        {steps.map((step, idx) => (
          <Fragment key={`${step.label}-${idx}`}>
            <Motion.div
              initial={{ opacity: 0, y: 14, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: idx * 0.12, duration: 0.4, ease: "easeOut" }}
              className="flex flex-col items-center gap-2 min-w-[88px] max-w-[110px]"
            >
              <IconBubble icon={step.icon} />
              <div className="text-center leading-tight">
                <p className="text-[12px] font-semibold text-white theme-light:text-slate-900">
                  {step.label}
                </p>
                <p className="text-[10px] text-white/60 mt-0.5 theme-light:text-slate-500">
                  {step.role}
                </p>
              </div>
            </Motion.div>

            {idx < steps.length - 1 ? (
              <Motion.div
                className="flex items-center justify-center self-start mt-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.12 + 0.2, duration: 0.3 }}
              >
                <Motion.div
                  className={`h-[2px] w-6 md:w-8 rounded-full bg-gradient-to-r ${accent}`}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.6, repeat: Infinity, delay: idx * 0.18 }}
                />
                <Motion.span
                  className={`text-base font-bold ml-1 bg-gradient-to-r ${accent} bg-clip-text text-transparent`}
                  animate={{ x: [-2, 2, -2] }}
                  transition={{ duration: 1.6, repeat: Infinity, delay: idx * 0.18 }}
                >
                  ›
                </Motion.span>
              </Motion.div>
            ) : null}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default TechOrchestration;
