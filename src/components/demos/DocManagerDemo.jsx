import { motion as Motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import TechOrchestration from "./TechOrchestration";

/**
 * DocManagerDemo
 *
 * Visual identity: a document-processing assembly line, broken into 3
 * vertical columns that read left-to-right:
 *  - Input  : stack of incoming documents with file icons + OCR tag
 *  - Cascade: AI steps with animated progress bars filling in sequence
 *  - Output : a mock Modelo 620 form with fields auto-filled by the AI
 *
 * Arrows between columns animate to show the flow. All strings live in
 * caseStudies.demos.docmanager.
 */

const DocIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
    <path d="M14 3v6h6" />
    <path d="M8 13h8M8 17h6" />
  </svg>
);

const DocManagerDemo = () => {
  const { t } = useLanguage();
  const demo = t("caseStudies.demos.docmanager");
  const {
    heading,
    subtitle,
    orchestration,
    inputTitle,
    inputItems,
    processingTitle,
    processingSteps,
    outputTitle,
    outputFields,
  } = demo;

  return (
    <div className="space-y-6">
      <div
        className="rounded-xl border border-purple-400/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-5
                   theme-light:border-purple-300/40 theme-light:from-purple-50 theme-light:to-pink-50"
      >
        <h4 className="text-base md:text-lg font-semibold text-white mb-2 theme-light:text-slate-900">{heading}</h4>
        <p className="text-sm text-white/75 leading-relaxed theme-light:text-slate-700">{subtitle}</p>
      </div>

      <TechOrchestration
        title={orchestration.title}
        steps={orchestration.steps}
        accent="from-purple-400 to-pink-400"
      />

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-stretch">
        {/* INPUT */}
        <div
          className="rounded-xl border border-white/15 bg-white/5 p-4
                     theme-light:bg-white theme-light:border-slate-200"
        >
          <p className="text-[11px] uppercase tracking-wider text-purple-300 font-semibold mb-3 theme-light:text-purple-700">
            {inputTitle}
          </p>
          <div className="space-y-2">
            {inputItems.map((item, i) => (
              <Motion.div
                key={item.name}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.12 }}
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-slate-900/40 p-2.5
                           theme-light:bg-slate-50 theme-light:border-slate-200"
              >
                <DocIcon className="w-5 h-5 text-pink-300 flex-shrink-0 theme-light:text-pink-600" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-white truncate theme-light:text-slate-900">{item.name}</p>
                  <p className="text-[10px] text-white/50 theme-light:text-slate-500">{item.tag}</p>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>

        {/* arrow */}
        <div className="hidden md:flex items-center justify-center">
          <Motion.span
            className="text-2xl text-purple-300 font-bold theme-light:text-purple-600"
            animate={{ opacity: [0.3, 1, 0.3], x: [-2, 2, -2] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            →
          </Motion.span>
        </div>

        {/* CASCADE */}
        <div
          className="rounded-xl border border-purple-400/30 bg-gradient-to-b from-purple-500/15 to-pink-500/10 p-4
                     theme-light:bg-purple-50 theme-light:border-purple-200"
        >
          <p className="text-[11px] uppercase tracking-wider text-purple-300 font-semibold mb-3 theme-light:text-purple-700">
            {processingTitle}
          </p>
          <div className="space-y-3">
            {processingSteps.map((step, i) => (
              <div key={step}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-white/85 theme-light:text-slate-800">{step}</span>
                  <Motion.span
                    className="text-[10px] text-green-300 theme-light:text-green-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.6 + 0.5 }}
                  >
                    ✓
                  </Motion.span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden theme-light:bg-slate-200">
                  <Motion.div
                    className="h-full bg-gradient-to-r from-purple-400 to-pink-400"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.4 + i * 0.6, duration: 0.5 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* arrow */}
        <div className="hidden md:flex items-center justify-center">
          <Motion.span
            className="text-2xl text-purple-300 font-bold theme-light:text-purple-600"
            animate={{ opacity: [0.3, 1, 0.3], x: [-2, 2, -2] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: 0.4 }}
          >
            →
          </Motion.span>
        </div>

        {/* OUTPUT — Modelo 620 mockup */}
        <Motion.div
          className="rounded-xl border border-white/15 bg-white p-4 text-slate-900 shadow-lg
                     theme-light:border-slate-300"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + processingSteps.length * 0.6 }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] uppercase tracking-wider font-bold text-purple-700">
              {outputTitle}
            </p>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-100 text-green-700 border border-green-200">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              OK
            </span>
          </div>

          <div className="space-y-2">
            {outputFields.map((field, i) => (
              <Motion.div
                key={field.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + processingSteps.length * 0.6 + i * 0.15 }}
                className="flex items-center justify-between gap-3 border-b border-slate-100 pb-1.5"
              >
                <span className="text-[11px] text-slate-500">{field.label}</span>
                <span className="text-xs font-mono font-medium text-slate-900">{field.value}</span>
              </Motion.div>
            ))}
          </div>
        </Motion.div>
      </div>
    </div>
  );
};

export default DocManagerDemo;
