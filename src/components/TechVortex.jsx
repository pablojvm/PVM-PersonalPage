import { useEffect, useMemo, useRef, useState } from "react";
import { motion as Motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { tecnologias } from "../data/tecnologias";
import TechIcon from "./TechIcon";

/**
 * TechVortex — scroll-driven 3D sphere of tech logos.
 *
 * The section is one viewport tall (`h-[100svh]` so it respects mobile
 * browser chrome). On mobile the sphere is rebuilt at a smaller radius
 * so it fits comfortably in the narrower viewport without crowding the
 * floating title above it.
 *
 * As the user scrolls the section through the viewport the sphere:
 *   1. fades in & scales up while sliding into view
 *   2. rotates around its Y axis for ~2 full turns
 *   3. fades out & shrinks slightly as it exits
 */

const computeSpherePositions = (n) => {
  const positions = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / Math.max(n - 1, 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    positions.push([Math.cos(theta) * r, y, Math.sin(theta) * r]);
  }
  return positions;
};

/* ------------------------- Per-icon node ------------------------- */

const VortexIcon = ({ tech, position, rotation, radius, size }) => {
  const [x0, y0, z0] = position;

  const x = useTransform(
    rotation,
    (r) => (x0 * Math.cos(r) + z0 * Math.sin(r)) * radius,
  );
  const z = useTransform(
    rotation,
    (r) => (-x0 * Math.sin(r) + z0 * Math.cos(r)) * radius,
  );
  const scale = useTransform(
    z,
    (zz) => 0.55 + ((zz + radius) / (2 * radius)) * 0.5,
  );
  const opacity = useTransform(
    z,
    (zz) => 0.3 + ((zz + radius) / (2 * radius)) * 0.6,
  );
  const zIndex = useTransform(z, (zz) => Math.round(zz));

  return (
    <Motion.div
      className="absolute left-1/2 top-1/2 pointer-events-none select-none"
      style={{
        x,
        y: y0 * radius,
        scale,
        opacity,
        zIndex,
        marginLeft: -size / 2,
        marginTop: -size / 2,
      }}
    >
      <TechIcon tech={tech} size={size} />
    </Motion.div>
  );
};

/* ------------------------- Viewport sizing ------------------------- */
/* useState wrapper that mirrors window.matchMedia and updates on resize so
   the vortex rebuilds at the right radius when the user rotates their
   phone or resizes their browser. */
const useIsMobile = (breakpoint = 640) => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);

  return isMobile;
};

/* ------------------------- Section ------------------------- */

const TechVortex = () => {
  const sectionRef = useRef(null);
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  // Mobile gets a noticeably smaller sphere so it doesn't bump into the
  // floating title and doesn't overflow the viewport width.
  const radius = isMobile ? 115 : 200;
  const iconSize = isMobile ? 32 : 48;

  const positions = useMemo(
    () => computeSpherePositions(tecnologias.length),
    [],
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const rotation = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReduced ? 0 : Math.PI * 4],
  );

  const sphereScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.6, 1, 1, 0.7],
  );
  const sphereOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    [0, 1, 1, 0],
  );

  const titleY = useTransform(scrollYProgress, [0, 0.35], [40, 0]);
  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    [0, 1, 1, 0],
  );

  return (
    <section
      ref={sectionRef}
      id="tech-vortex"
      className="relative h-[100svh] overflow-hidden flex items-center justify-center"
      aria-label={t("tech.title")}
    >
      {/* Soft circular halo behind the sphere */}
      <Motion.div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        style={{ opacity: sphereOpacity }}
        aria-hidden="true"
      >
        <div
          className="rounded-full"
          style={{
            width: isMobile ? "min(56vh, 360px)" : "min(70vh, 720px)",
            height: isMobile ? "min(56vh, 360px)" : "min(70vh, 720px)",
            background:
              "radial-gradient(circle at center, rgba(168,85,247,0.22) 0%, rgba(236,72,153,0.12) 40%, transparent 75%)",
            filter: "blur(36px)",
          }}
        />
      </Motion.div>

      {/* Floating title */}
      <Motion.div
        className="absolute top-[8vh] sm:top-[12vh] left-0 right-0 text-center px-4 z-20"
        style={{ y: titleY, opacity: titleOpacity }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white theme-light:text-slate-900">
          {t("tech.title")}
        </h2>
        <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-white/70 max-w-2xl mx-auto theme-light:text-slate-600">
          {t("tech.subtitle")}
        </p>
      </Motion.div>

      {/* The vortex */}
      <Motion.div
        className="relative"
        style={{
          width: radius * 2.4,
          height: radius * 2.4,
          scale: sphereScale,
          opacity: sphereOpacity,
          transformStyle: "preserve-3d",
          perspective: 1100,
        }}
        aria-hidden="true"
      >
        {tecnologias.map((tech, i) => (
          <VortexIcon
            key={tech.name}
            tech={tech}
            position={positions[i]}
            rotation={rotation}
            radius={radius}
            size={iconSize}
          />
        ))}
      </Motion.div>
    </section>
  );
};

export default TechVortex;
