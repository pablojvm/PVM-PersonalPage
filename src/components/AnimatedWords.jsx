import { useEffect, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";

/**
 * AnimatedWords
 *
 * Cycles through a list of phrases with a soft vertical fade, in the
 * spirit of `raffo.dev`'s hero. The component is intentionally minimal:
 *  - one phrase visible at a time
 *  - swaps every `interval` ms (3.2s by default)
 *  - respects `prefers-reduced-motion` (no rotation, shows first phrase)
 *
 * Props:
 *   - words: string[]   list of phrases to rotate through
 *   - interval?: number ms between swaps
 *   - className?: string extra classes applied to the active span
 */
const AnimatedWords = ({ words, interval = 3200, className = "" }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!words || words.length <= 1) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [words, interval]);

  if (!words || words.length === 0) return null;

  return (
    <span className="relative inline-block align-baseline">
      <AnimatePresence mode="wait">
        <Motion.span
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
          className={`inline-block ${className}`}
        >
          {words[index]}
        </Motion.span>
      </AnimatePresence>
    </span>
  );
};

export default AnimatedWords;
