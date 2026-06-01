import { useEffect } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";

const Modal = ({ isOpen, onClose, title, children, closeLabel = "Cerrar" }) => {
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleEsc = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <Motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Motion.button
            type="button"
            aria-label="Cerrar"
            className="absolute inset-0 bg-black/65 backdrop-blur-sm"
            onClick={onClose}
          />

          <Motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl border border-white/20 bg-slate-900/90 shadow-2xl
                       theme-light:bg-white theme-light:border-slate-200"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 theme-light:border-slate-200">
              <h3 className="text-lg md:text-xl font-semibold text-white theme-light:text-slate-900">{title}</h3>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-white/20 px-3 py-1.5 text-sm text-white/80 hover:bg-white/10 transition-colors
                           theme-light:border-slate-300 theme-light:text-slate-700 theme-light:hover:bg-slate-100"
              >
                {closeLabel}
              </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-72px)] p-5 md:p-6">{children}</div>
          </Motion.div>
        </Motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Modal;