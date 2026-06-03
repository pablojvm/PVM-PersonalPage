import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { useLanguage } from "./contexts/LanguageContext";
import { useTheme } from "./contexts/ThemeContext";
import TopBar from "./components/TopBar";
import HeroNav from "./components/HeroNav";
import CallCenterDemo from "./components/demos/CallCenterDemo";
import SchedulerDemo from "./components/demos/SchedulerDemo";
import DocManagerDemo from "./components/demos/DocManagerDemo";

/* ------------------------- Canvas animation hook ------------------------- */
const useCanvasAnimation = (canvasRef, isDark) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const particles = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 8 + 3,
        dx: (Math.random() - 0.5) * 0.8,
        dy: (Math.random() - 0.5) * 0.8,
      });
    }

    const fillStyle = isDark
      ? "rgba(147, 197, 253, 0.4)"
      : "rgba(99, 102, 241, 0.25)";
    const strokeStyle = isDark
      ? "rgba(147, 197, 253, 0.6)"
      : "rgba(99, 102, 241, 0.4)";

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.r, 0, 2 * Math.PI);
        ctx.fillStyle = fillStyle;
        ctx.fill();

        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = 1;
        ctx.stroke();

        particle.x += particle.dx;
        particle.y += particle.dy;

        if (particle.x > canvas.width + particle.r) particle.x = -particle.r;
        if (particle.x < -particle.r) particle.x = canvas.width + particle.r;
        if (particle.y > canvas.height + particle.r) particle.y = -particle.r;
        if (particle.y < -particle.r) particle.y = canvas.height + particle.r;
      });

      animationId = requestAnimationFrame(animate);
    }

    setTimeout(() => {
      animate();
    }, 100);

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [canvasRef, isDark]);
};

/* --------------------------- Project card --------------------------- */
const ProjectCard = ({
  titulo,
  descripcion,
  foto,
  liveUrl,
  githubUrl,
  liveLabel,
  githubLabel,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition-all duration-300
                 theme-light:bg-white theme-light:border-slate-200 theme-light:shadow-md h-full flex flex-col"
    >
      {/* Image / hero area (fixed height) */}
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-purple-500/10 to-pink-500/10">
        {!hasError ? (
          <img
            src={foto}
            alt={titulo}
            className={`w-full h-full object-cover object-center transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setHasError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl">📷</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent theme-light:from-black/15" />
      </div>

      {/* Content (flex-grow para igualar alturas) */}
      <div className="p-6 flex flex-col flex-grow">
        <h3
          className="text-xl font-semibold mb-2 text-white group-hover:text-purple-300 transition-colors
                     theme-light:text-slate-900 theme-light:group-hover:text-purple-600"
        >
          {titulo}
        </h3>

        <p className="text-white/80 text-sm leading-relaxed mb-4 theme-light:text-slate-700">
          {descripcion}
        </p>

        {/* Acciones empujadas al fondo para alinear botones entre cards */}
        <div className="flex gap-3 mt-auto">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-lg hover:scale-105 transition-all duration-200 text-green-300 hover:text-green-200 text-sm font-medium
                         theme-light:from-green-500/15 theme-light:to-emerald-500/15 theme-light:text-green-700 theme-light:hover:text-green-800"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              {liveLabel}
            </a>
          )}

          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-600/20 to-gray-800/20 border border-gray-400/30 rounded-lg hover:scale-105 transition-all duration-200 text-gray-300 hover:text-gray-200 text-sm font-medium
                         theme-light:from-slate-500/10 theme-light:to-slate-700/10 theme-light:text-slate-700 theme-light:hover:text-slate-900"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              {githubLabel}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

/* --------------------------- Product card --------------------------- */
const ProductCard = ({
  titulo,
  descripcion,
  foto,
  accent,
  tags = [],
  comingSoonLabel,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition-all duration-300
                 theme-light:bg-white theme-light:border-slate-200 theme-light:shadow-md"
    >
      {/* Pill Coming soon */}
      <span
        className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider
                   bg-amber-500/25 text-amber-100 border border-amber-300/40 backdrop-blur-md
                   theme-light:bg-amber-100 theme-light:text-amber-800 theme-light:border-amber-300"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse theme-light:bg-amber-500" />
        {comingSoonLabel}
      </span>

      <div
        className={`relative h-44 overflow-hidden bg-gradient-to-br ${accent}`}
      >
        {foto && !hasError ? (
          <img
            src={foto}
            alt={titulo}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setHasError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl">🚀</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent theme-light:from-black/15" />
      </div>

      <div className="p-6">
        <h3
          className="text-xl font-semibold mb-2 text-white group-hover:text-purple-300 transition-colors
                     theme-light:text-slate-900 theme-light:group-hover:text-purple-600"
        >
          {titulo}
        </h3>
        <p className="text-white/80 text-sm leading-relaxed mb-4 theme-light:text-slate-700">
          {descripcion}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md text-xs bg-white/5 border border-white/15 text-white/80
                         theme-light:bg-slate-100 theme-light:border-slate-200 theme-light:text-slate-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

/* --------------------------- Tech data --------------------------- */
const tecnologias = [
  { name: "JavaScript", slug: "javascript", color: "F7DF1E" },
  { name: "Python", slug: "python", color: "3776AB" },
  { name: "TypeScript", slug: "typescript", color: "3178C6" },
  { name: "React", slug: "react", color: "61DAFB" },
  { name: "Node.js", slug: "nodedotjs", color: "5FA04E" },
  { name: "Express", slug: "express", color: "FFFFFF" },
  { name: "MongoDB", slug: "mongodb", color: "47A248" },
  { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
  { name: "HTML5", slug: "html5", color: "E34F26" },
  { name: "CSS", slug: "css", color: "1572B6" },
  { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" },
  { name: "Bootstrap", slug: "bootstrap", color: "7952B3" },
  { name: "Git", slug: "git", color: "F05032" },
  { name: "Postman", slug: "postman", color: "FF6C37" },
  { name: "n8n", slug: "n8n", color: "EA4B71" },
  { name: "Docker", slug: "docker", color: "2496ED" },
  {
    name: "Azure",
    iconUrl: "https://api.iconify.design/logos:microsoft-azure.svg",
  },
  {
    name: "PowerBI",
    iconUrl: "https://api.iconify.design/logos:microsoft-power-bi.svg",
  },
  {
    name: "Microsoft Teams",
    iconUrl: "https://api.iconify.design/logos:microsoft-teams.svg",
  },
  { name: "GitHub Actions", slug: "githubactions", color: "2088FF" },
  { name: "WordPress", slug: "wordpress", color: "21759B" },
  { name: "Stripe", slug: "stripe", color: "635BFF" },
  { name: "Revolut", slug: "revolut", color: "FFFFFF" },
  { name: "Brevo", slug: "brevo", color: "0B996E" },
  {
    name: "Twilio",
    iconUrl: "https://api.iconify.design/logos:twilio-icon.svg",
  },
  { name: "Deepgram", slug: "deepgram", color: "13EF93" },
  {
    name: "OpenAI",
    color: "FFFFFF",
    path: "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zM3.6087 18.3036a4.4708 4.4708 0 0 1-.5346-3.0137l.1419.0852 4.7783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1313-1.6466zM2.3408 7.8956a4.485 4.485 0 0 1 2.3654-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7866A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654 2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.5093-2.6067-1.4998Z",
  },
  {
    name: "Anthropic",
    color: "D97757",
    path: "M13.827 3.52h3.603L24 20.481h-3.603l-6.57-16.96zm-7.258 0h3.767l6.57 16.96H13.34l-1.343-3.461H5.165l-1.344 3.46H0L6.569 3.52zm4.261 10.014L8.448 7.605l-2.382 5.93h4.764z",
  },
];

/* --------------------------- Icon helpers & component --------------------------- */
const normalizeHex = (c) => {
  if (!c) return null;
  return c.startsWith("#") ? c.toUpperCase() : `#${c.toUpperCase()}`;
};

const hexForUrl = (c) => (c ? c.replace(/^#/, "").toUpperCase() : undefined);

const TechIcon = ({ tech, size = 56, className = "" }) => {
  const [imgError, setImgError] = useState(false);

  const fillColor = normalizeHex(tech.color) || "currentColor";
  const colorForUrl = hexForUrl(tech.color);

  if (tech.iconUrl && !imgError) {
    const styleWhiteBg =
      tech.color && tech.color.replace?.(/^#?/, "")?.toUpperCase() === "FFFFFF"
        ? { background: "rgba(255,255,255,0.08)", padding: 8, borderRadius: 8 }
        : undefined;

    return (
      <>
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
        {imgError ? (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: size / 4,
            }}
            aria-hidden
          />
        ) : null}
      </>
    );
  }

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

/* --------------------------- Tech carousel (integrated) --------------------------- */
export const TechCarousel = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const scrollRef = useRef(null);
  const isPausedRef = useRef(false);
  const lista = [...tecnologias, ...tecnologias];

  const techList = isDark
    ? lista
    : lista.map((tech) => {
        if (!tech.color) return tech;
        if (tech.color.toUpperCase() === "FFFFFF" || tech.color === "#FFFFFF")
          return { ...tech, color: "111827" };
        return tech;
      });

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const wrap = () => {
      const halfWidth = el.scrollWidth / 2;
      if (halfWidth > 0 && el.scrollLeft >= halfWidth) {
        el.scrollLeft -= halfWidth;
      }
    };

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    el.addEventListener("scroll", wrap, { passive: true });

    if (prefersReduced) {
      return () => el.removeEventListener("scroll", wrap);
    }

    let rafId;
    let lastTime = 0;
    const speed = 28;

    const tick = (now) => {
      if (lastTime === 0) lastTime = now;
      const delta = now - lastTime;
      lastTime = now;

      if (!isPausedRef.current) {
        el.scrollLeft += (speed * delta) / 1000;
      }
      wrap();

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const enter = () => {
      isPausedRef.current = true;
    };
    const leave = () => {
      isPausedRef.current = false;
    };

    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    el.addEventListener("touchstart", enter, { passive: true });
    el.addEventListener("touchend", leave);

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("scroll", wrap);
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
      el.removeEventListener("touchstart", enter);
      el.removeEventListener("touchend", leave);
    };
  }, []);

  return (
    <section id="tech" className="py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white theme-light:text-slate-900">
        {t("tech.title")}
      </h2>
      <p className="text-center text-white/70 max-w-2xl mx-auto mb-12 px-4 theme-light:text-slate-600">
        {t("tech.subtitle")}
      </p>
      <div className="relative">
        <div
          ref={scrollRef}
          className="tech-scroll overflow-x-auto overflow-y-hidden"
        >
          <div className="flex gap-16 w-max py-2 px-8">
            {techList.map((tech, i) => (
              <div
                key={`${tech.name}-${i}`}
                className="flex flex-col items-center gap-3 min-w-[80px] group"
                title={tech.name}
              >
                <div className="flex items-center justify-center">
                  <TechIcon
                    tech={tech}
                    size={56}
                    className="w-14 h-14 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                  />
                </div>
                <span
                  className="text-xs text-white/70 group-hover:text-white transition-colors whitespace-nowrap
                                 theme-light:text-slate-600 theme-light:group-hover:text-slate-900"
                >
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-800 to-transparent z-10
                        theme-light:from-slate-50"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-indigo-900 to-transparent z-10
                        theme-light:from-slate-100"
        />
      </div>
    </section>
  );
};

/* --------------------------- Automation section --------------------------- */
const AutomationSection = () => {
  const { t } = useLanguage();
  const metrics = t("automation.metrics");
  const capabilities = t("automation.capabilities");

  const gradients = [
    {
      gradient: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-400/30",
    },
    {
      gradient: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-400/30",
    },
    {
      gradient: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-400/30",
    },
    {
      gradient: "from-amber-500/20 to-orange-500/20",
      borderColor: "border-amber-400/30",
    },
  ];

  return (
    <section id="automation" className="px-4 sm:px-6 lg:px-10 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span
            className="inline-block px-4 py-1 bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-400/40 rounded-full text-purple-200 text-sm font-medium mb-4
                           theme-light:text-purple-700"
          >
            {t("automation.badge")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white theme-light:text-slate-900">
            {t("automation.title")}
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed theme-light:text-slate-700">
            {t("automation.description")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center hover:scale-105 transition-all duration-300
                         theme-light:bg-white theme-light:border-slate-200 theme-light:shadow-md"
            >
              <div
                className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent
                              theme-light:from-purple-600 theme-light:to-pink-600"
              >
                {m.valor}
              </div>
              <div className="text-xs md:text-sm text-white/70 mt-1 theme-light:text-slate-600">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((cap, idx) => {
            const g = gradients[idx % gradients.length];
            return (
              <div
                key={cap.titulo}
                className={`bg-gradient-to-br ${g.gradient} backdrop-blur-md border ${g.borderColor} rounded-xl p-6 hover:scale-[1.02] transition-all duration-300
                            theme-light:bg-none theme-light:bg-white theme-light:border-slate-200 theme-light:shadow-md`}
              >
                <h3 className="text-xl font-semibold text-white mb-4 theme-light:text-slate-900">
                  {cap.titulo}
                </h3>
                <ul className="space-y-2">
                  {cap.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-white/85 text-sm theme-light:text-slate-700"
                    >
                      <span className="text-purple-300 mt-0.5 theme-light:text-purple-600">
                        ▸
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* --------------------------- Case study card & assets --------------------------- */
const CaseStudyCard = ({
  sector,
  titulo,
  problema,
  solucion,
  tech,
  impacto,
  gradient,
  icon,
  labels,
  onOpenDemo,
}) => (
  <article
    className={`group bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:scale-[1.02] hover:border-white/30 transition-all duration-300 flex flex-col
                theme-light:bg-white theme-light:border-slate-200 theme-light:shadow-md theme-light:hover:border-slate-300 ${
                  onOpenDemo ? "cursor-pointer" : ""
                }`}
    role={onOpenDemo ? "button" : undefined}
    tabIndex={onOpenDemo ? 0 : undefined}
    onClick={onOpenDemo}
    onKeyDown={(event) => {
      if (!onOpenDemo) return;
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onOpenDemo();
      }
    }}
  >
    <div className="flex items-start gap-4 mb-5">
      <div
        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-xs text-purple-300 uppercase tracking-wider font-semibold theme-light:text-purple-700">{sector}</span>
        <h3 className="text-lg font-semibold text-white mt-1 leading-tight theme-light:text-slate-900">{titulo}</h3>
        {onOpenDemo ? (
          <span className="inline-flex mt-2 px-2.5 py-1 rounded-full text-[11px] font-medium bg-cyan-500/20 text-cyan-200 border border-cyan-400/30
                          theme-light:bg-cyan-100 theme-light:text-cyan-700 theme-light:border-cyan-200">
            {labels.interactiveDemo}
          </span>
        ) : null}
      </div>
    </div>

    <div className="space-y-4 mb-5 flex-grow">
      <div>
        <h4 className="text-xs text-white/50 font-semibold uppercase tracking-wider mb-1 theme-light:text-slate-500">{labels.challenge}</h4>
        <p className="text-sm text-white/80 leading-relaxed theme-light:text-slate-700">{problema}</p>
      </div>
      <div>
        <h4 className="text-xs text-white/50 font-semibold uppercase tracking-wider mb-1 theme-light:text-slate-500">{labels.solution}</h4>
        <p className="text-sm text-white/80 leading-relaxed theme-light:text-slate-700">{solucion}</p>
      </div>
    </div>

    <div className="flex flex-wrap gap-2 mb-4">
      {tech.map((t) => (
        <span key={t} className="px-2.5 py-1 bg-white/5 border border-white/15 rounded-md text-xs text-white/80
                                  theme-light:bg-slate-100 theme-light:border-slate-200 theme-light:text-slate-700">
          {t}
        </span>
      ))}
    </div>

    {onOpenDemo ? (
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onOpenDemo();
        }}
        className="mb-4 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-cyan-400/35 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-200 text-sm font-medium hover:scale-[1.02] transition-all
                   theme-light:text-cyan-700 theme-light:border-cyan-300 theme-light:from-cyan-100 theme-light:to-blue-100"
      >
        {labels.viewDemo}
      </button>
    ) : null}

    <div className="border-t border-white/10 pt-4 space-y-1.5 theme-light:border-slate-200">
      {impacto.map((i) => (
        <div key={i} className="flex items-center gap-2 text-sm text-green-300 theme-light:text-green-700">
          <svg className="w-4 h-4 text-green-400 flex-shrink-0 theme-light:text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span>{i}</span>
        </div>
      ))}
    </div>

    <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 theme-light:border-slate-200">
      <svg className="w-3.5 h-3.5 text-white/40 theme-light:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
      <span className="text-xs text-white/40 italic theme-light:text-slate-500">{labels.confidential}</span>
    </div>
  </article>
);

const caseStudyAssets = [
  {
    // Proyecto 1: Scheduler + PowerBI
    tech: ["n8n", "PowerBI", "Webhooks", "Custom Web App"],
    gradient: "from-blue-500 to-cyan-500",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    demo: "scheduler",
  },
  {
    // Proyecto 2: Coches + IA Documental
    tech: ["OpenAI", "n8n", "AI Document Analysis", "PDF Automation", "PostgreSQL", "Railway"],
    gradient: "from-purple-500 to-pink-500",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    demo: "docmanager"
  },
  {
    // Proyecto 3: Call Center IA
    tech: ["AI Voice API", "n8n", "NLP", "CRM Integration", "Smart Routing"],
    gradient: "from-green-500 to-emerald-500",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    demo: "callCenter",
  },
];

/* --------------------------- Project assets (Casero removed) --------------------------- */
const projectAssets = [
  {
    foto: "/captura5.png",
    liveUrl: "https://galileopsicologos.netlify.app/",
    githubUrl: "https://github.com/pablojvm/GalileoPsicologos-Client",
  },
  {
    foto: "/captura4.png",
    liveUrl: "https://airb2b.netlify.app/",
    githubUrl: "https://github.com/pablojvm/AirB2B-Client",
  },
];

/* --------------------------- Product assets --------------------------- */
const productAssets = [
  {
    foto: "/captura6.png", // reusa la captura de Casero
    accent: "from-purple-500/30 to-pink-500/30",
  },
  {
    foto: "/captura7.png", // placeholder con icono hasta tener captura
    accent: "from-amber-500/30 to-red-500/30",
  },
];

/* --------------------------- Home Page --------------------------- */
const HomePage = () => {
  const canvasRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeDemo, setActiveDemo] = useState(null);
  const [activeNav, setActiveNav] = useState("about");
  const { t } = useLanguage();
  const { isDark } = useTheme();

  useCanvasAnimation(canvasRef, isDark);

  // Track which logical section is in view so the hero pill slides to it.
  useEffect(() => {
    const sectionToNav = {
      hero: "about",
      about: "about",
      "case-studies": "automation",
      automation: "automation",
      proyectos: "projects",
      productos: "products",
      contact: "contact",
    };

    const ratios = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.intersectionRatio);
        });

        let maxRatio = 0;
        let next = null;
        for (const [sectionId, ratio] of ratios) {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            next = sectionToNav[sectionId];
          }
        }
        // Solo actualizamos si supera un umbral pequeño (evita cambios por micro-intersecciones)
        if (next && maxRatio > 0.12) setActiveNav(next);
      },
      // rootMargin ayuda a detectar mejor cuando volvemos arriba (ajusta si es necesario)
      {
        threshold: [0, 0.12, 0.25, 0.5, 0.75, 1],
        rootMargin: "-10% 0px -40% 0px",
      },
    );

    Object.keys(sectionToNav).forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const proyectosI18n = t("projects.items");
  const proyectos = projectAssets.map((p, i) => ({
    ...p,
    titulo: proyectosI18n[i]?.titulo ?? "",
    descripcion: proyectosI18n[i]?.descripcion ?? "",
  }));

  const productsI18n = t("products.items");
  const products = productAssets.map((p, i) => ({
    ...p,
    titulo: productsI18n[i]?.titulo ?? "",
    descripcion: productsI18n[i]?.descripcion ?? "",
    tags: productsI18n[i]?.tags ?? [],
  }));

  const aboutP1 = t("about.p1");
  const aboutP2 = t("about.p2");
  const aboutP3 = t("about.p3");
  const aboutTags = t("about.tags");

  const caseStudiesI18n = t("caseStudies.items");
  const caseLabels = t("caseStudies.labels");
  const caseDemoTitles = t("caseStudies.demoTitles");
  const caseStudies = caseStudyAssets.map((asset, i) => ({
    ...asset,
    ...caseStudiesI18n[i],
  }));

  const activeDemoTitle = activeDemo
    ? (caseDemoTitles?.[activeDemo] ?? "Demo")
    : "";

  const handleDownloadCV = () => {
    setIsDownloading(true);
    try {
      const link = document.createElement("a");
      link.href = "/PVM-CV.pdf";
      link.download = "Pablo-Villar-CV.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the CV:", error);
      alert(t("errors.cvDownload"));
    } finally {
      setTimeout(() => setIsDownloading(false), 1000);
    }
  };

  const scrollTo = (selector) => {
    const node = document.querySelector(selector);
    if (node) node.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-gradient-to-r from-slate-800 to-indigo-900 text-white
                 theme-light:bg-none theme-light:bg-slate-50 theme-light:text-slate-900"
      style={{ zIndex: 0 }}
    >
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      />

      <div className="relative" style={{ zIndex: 10 }}>
        <TopBar />

        <header id="hero" className="text-center py-20 px-4">
          <h1
            className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent
                         theme-light:from-purple-600 theme-light:to-pink-600"
          >
            {t("hero.greeting")}
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto theme-light:text-slate-700">
            {t("hero.role")}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-3 justify-center items-center flex-wrap">
            <HeroNav
              activeId={activeNav}
              onSelect={(id) => {
                setActiveNav(id);
                const target = {
                  about: "#about",
                  automation: "#case-studies",
                  projects: "#proyectos",
                  products: "#productos",
                  contact: "#contact",
                }[id];
                if (target) scrollTo(target);
              }}
              items={[
                {
                  id: "about",
                  label: t("hero.ctaAbout"),
                  ariaLabel: t("hero.ariaAbout"),
                },
                {
                  id: "automation",
                  label: t("hero.ctaAutomation"),
                  ariaLabel: t("hero.ariaAutomation"),
                },
                {
                  id: "projects",
                  label: t("hero.ctaProjects"),
                  ariaLabel: t("hero.ariaProjects"),
                },
                {
                  id: "products",
                  label: t("hero.ctaProducts"),
                  ariaLabel: t("hero.ariaProducts"),
                },
                {
                  id: "contact",
                  label: t("hero.ctaContact"),
                  ariaLabel: t("hero.ariaContact"),
                },
              ]}
            />

            <button
              onClick={handleDownloadCV}
              disabled={isDownloading}
              className="
              px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap
              bg-white text-slate-900
              shadow-[inset_0_1px_0_0_rgba(255,255,255,0.7),0_8px_24px_-6px_rgba(255,255,255,0.25)]
              hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.7),0_12px_32px_-6px_rgba(255,255,255,0.35)]
              hover:scale-[1.02] active:scale-[0.98]
              transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60
              theme-light:bg-slate-900 theme-light:text-white
              theme-light:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),0_8px_24px_-6px_rgba(15,23,42,0.35)]
              theme-light:hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),0_12px_32px_-6px_rgba(15,23,42,0.45)]
            "
              aria-label={t("hero.ariaDownloadCV")}
            >
              {isDownloading
                ? t("hero.ctaDownloading")
                : t("hero.ctaDownloadCV")}
            </button>
          </div>
        </header>

        {/* ============ SOBRE MÍ ============ */}
        <section id="about" className="px-4 sm:px-6 lg:px-10 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white theme-light:text-slate-900">
              {t("about.title")}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center lg:justify-start">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative">
                    <img
                      src="/download (3).png"
                      alt={t("about.imageAlt")}
                      className="w-80 h-80 object-cover rounded-2xl shadow-2xl border-4 border-white/20"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <div className="hidden w-80 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl shadow-2xl border-4 border-white/20 items-center justify-center">
                      <div className="text-center text-white/80 theme-light:text-slate-600">
                        <div className="text-6xl mb-4">👨🏼‍💻</div>
                        <p className="text-lg">{t("about.placeholder")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 shadow-lg
                              theme-light:bg-white theme-light:border-slate-200"
                >
                  <p className="text-lg leading-relaxed text-white/90 mb-6 theme-light:text-slate-700">
                    {aboutP1.intro}
                    <span className="text-purple-300 font-semibold theme-light:text-purple-700">
                      {aboutP1.role}
                    </span>
                    {aboutP1.middle}
                    <span className="text-yellow-300 font-medium theme-light:text-yellow-700">
                      {aboutP1.js}
                    </span>
                    {aboutP1.comma1}
                    <span className="text-blue-300 font-medium theme-light:text-blue-700">
                      {aboutP1.react}
                    </span>
                    {aboutP1.comma2}
                    <span className="text-green-300 font-medium theme-light:text-green-700">
                      {aboutP1.node}
                    </span>
                    {aboutP1.and1}
                    <span className="text-green-400 font-medium theme-light:text-green-700">
                      {aboutP1.mongo}
                    </span>
                    {aboutP1.tail1}
                    <span className="text-pink-300 font-medium theme-light:text-pink-700">
                      {aboutP1.n8n}
                    </span>
                    {aboutP1.comma3}
                    <span className="text-cyan-300 font-medium theme-light:text-cyan-700">
                      {aboutP1.docker}
                    </span>
                    {aboutP1.and2}
                    <span className="text-purple-300 font-medium theme-light:text-purple-700">
                      {aboutP1.ai}
                    </span>
                    {aboutP1.tail2}
                  </p>

                  <p className="text-lg leading-relaxed text-white/90 mb-6 theme-light:text-slate-700">
                    {aboutP2.intro}
                    <span className="text-pink-300 font-medium theme-light:text-pink-700">
                      {aboutP2.communication}
                    </span>
                    {aboutP2.comma1}
                    <span className="text-pink-300 font-medium theme-light:text-pink-700">
                      {aboutP2.adaptability}
                    </span>
                    {aboutP2.and}
                    <span className="text-pink-300 font-medium theme-light:text-pink-700">
                      {aboutP2.teamwork}
                    </span>
                    {aboutP2.middle}
                    <span className="text-purple-300 font-medium theme-light:text-purple-700">
                      {aboutP2.scalable}
                    </span>
                    {aboutP2.tail}
                  </p>

                  <p className="text-lg leading-relaxed text-white/90 theme-light:text-slate-700">
                    {aboutP3.intro}
                    <span className="text-purple-300 font-medium theme-light:text-purple-700">
                      {aboutP3.fullstack}
                    </span>
                    {aboutP3.middle1}
                    <span className="text-blue-300 font-medium theme-light:text-blue-700">
                      {aboutP3.apis}
                    </span>
                    {aboutP3.comma1}
                    <span className="text-blue-300 font-medium theme-light:text-blue-700">
                      {aboutP3.crms}
                    </span>
                    {aboutP3.and}
                    <span className="text-blue-300 font-medium theme-light:text-blue-700">
                      {aboutP3.llms}
                    </span>
                    {aboutP3.tail}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {aboutTags.map((focus) => (
                    <span
                      key={focus}
                      className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-300/30 rounded-full text-white/90 text-sm font-medium hover:scale-105 transition-transform
                               theme-light:from-purple-500/10 theme-light:to-pink-500/10 theme-light:text-slate-800 theme-light:border-purple-400/30"
                    >
                      {focus}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <TechCarousel />

        {/* ============ CASE STUDIES ============ */}
        <section id="case-studies" className="px-4 sm:px-6 lg:px-10 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white theme-light:text-slate-900">
              {t("caseStudies.title")}
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto theme-light:text-slate-600">
              {t("caseStudies.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((cs, i) => (
              <CaseStudyCard
                key={i}
                {...cs}
                labels={caseLabels}
                isActive={activeDemo === cs.demo}
                onOpenDemo={
                  cs.demo
                    ? () => {
                        setActiveDemo((prev) => (prev === cs.demo ? null : cs.demo));
                        // small delay so the panel mounts before scrolling
                        setTimeout(() => {
                          const target = document.getElementById("active-demo-panel");
                          if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
                        }, 80);
                      }
                    : undefined
                }
              />
            ))}
          </div>

          {/* Inline demo panel — replaces the modal */}
          <AnimatePresence mode="wait">
            {activeDemo ? (
              <Motion.div
                id="active-demo-panel"
                key={activeDemo}
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 32 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div
                  className="relative rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-5 md:p-7
                             theme-light:bg-white theme-light:border-slate-200 theme-light:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="min-w-0">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider
                                       bg-cyan-500/20 text-cyan-200 border border-cyan-400/30 mb-2
                                       theme-light:bg-cyan-100 theme-light:text-cyan-700 theme-light:border-cyan-200">
                        {caseLabels.interactiveDemo}
                      </span>
                      <h3 className="text-xl md:text-2xl font-semibold text-white theme-light:text-slate-900">
                        {activeDemoTitle}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveDemo(null)}
                      className="flex-shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/10 transition-colors
                                 theme-light:border-slate-300 theme-light:bg-white theme-light:text-slate-700 theme-light:hover:bg-slate-50"
                      aria-label={caseLabels.closeDemo}
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
                      </svg>
                      {caseLabels.closeDemo}
                    </button>
                  </div>

                  {activeDemo === "scheduler" ? <SchedulerDemo /> : null}
                  {activeDemo === "docmanager" ? <DocManagerDemo /> : null}
                  {activeDemo === "callCenter" ? <CallCenterDemo /> : null}
                </div>
              </Motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </section>

      <AutomationSection />

        {/* ============ AUTOMATION ============ */}
        <AutomationSection />

        {/* ============ PROYECTOS ============ */}
        <section id="proyectos" className="px-4 sm:px-6 lg:px-10 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white theme-light:text-slate-900">
              {t("projects.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {proyectos.map((p, idx) => (
                <ProjectCard
                  key={idx}
                  {...p}
                  liveLabel={t("projects.liveDemo")}
                  githubLabel={t("projects.github")}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ============ MIS PRODUCTOS ============ */}
        <section id="productos" className="px-4 sm:px-6 lg:px-10 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white theme-light:text-slate-900">
                {t("products.title")}
              </h2>
              <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed theme-light:text-slate-700">
                {t("products.subtitle")}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map((p, idx) => (
                <ProductCard
                  key={idx}
                  {...p}
                  comingSoonLabel={t("products.comingSoonPill")}
                />
              ))}
            </div>
          </div>
          {/* Mensaje: solicitar demo por email (simple) */}
          {/* Mensaje con botón CTA */}
          <div className="text-center mb-8 mt-10">
            <p className="text-lg text-white/80 max-w-3xl mx-auto mb-4 leading-relaxed theme-light:text-slate-700">
              ¿Quieres una muestra o demo personalizada? Escríbeme y te la
              preparo.
            </p>
            <a
              href="mailto:pablo.villar.moron@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:scale-105 transition-all duration-200 text-white font-semibold"
            >
              Pedir demo
            </a>
          </div>
        </section>

        {/* ============ CONTACT ============ */}
        <section id="contact" className="px-4 sm:px-6 lg:px-10 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white theme-light:text-slate-900">
              {t("contact.title")}
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed theme-light:text-slate-700">
              {t("contact.subtitle")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
              <a
                href="mailto:pablojvillarm@gmail.com"
                className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:scale-105 transition-all duration-300
                           theme-light:bg-white theme-light:border-slate-200 theme-light:shadow-md"
              >
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div
                  className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors
                                theme-light:text-slate-900 theme-light:group-hover:text-purple-600"
                >
                  {t("contact.email")}
                </div>
                <div className="text-xs text-white/60 mt-1 theme-light:text-slate-600">
                  pablojvillarm@gmail.com
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/pablojvillarm/"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:scale-105 transition-all duration-300
                           theme-light:bg-white theme-light:border-slate-200 theme-light:shadow-md"
              >
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
                <div
                  className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors
                                theme-light:text-slate-900 theme-light:group-hover:text-blue-600"
                >
                  {t("contact.linkedin")}
                </div>
                <div className="text-xs text-white/60 mt-1 theme-light:text-slate-600">
                  pablojvillarm
                </div>
              </a>

              <a
                href="https://github.com/pablojvm"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:scale-105 transition-all duration-300
                           theme-light:bg-white theme-light:border-slate-200 theme-light:shadow-md"
              >
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <div
                  className="text-sm font-semibold text-white group-hover:text-gray-300 transition-colors
                                theme-light:text-slate-900 theme-light:group-hover:text-slate-700"
                >
                  {t("contact.github")}
                </div>
                <div className="text-xs text-white/60 mt-1 theme-light:text-slate-600">
                  pablojvm
                </div>
              </a>
            </div>

            <div
              className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-purple-400/30 rounded-2xl p-8 md:p-10
                            theme-light:from-purple-100 theme-light:to-pink-100 theme-light:border-purple-200"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white theme-light:text-slate-900">
                {t("contact.ctaTitle")}
              </h3>
              <p className="text-white/80 mb-6 max-w-xl mx-auto theme-light:text-slate-700">
                {t("contact.ctaSubtitle")}
              </p>
              <a
                href="mailto:pablojvillarm@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:scale-105 transition-all duration-200 text-white font-semibold"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {t("contact.ctaButton")}
              </a>
            </div>
          </div>
        </section>

        <footer className="text-center py-8 text-white/60 text-sm theme-light:text-slate-500">
          © {new Date().getFullYear()} {t("footer.rights")}
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
