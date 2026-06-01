import { motion as Motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";

/**
 * CallCenterDemo
 *
 * Visual identity: a live phone-call dashboard.
 *  - 2-column layout: phone with animated waveform + live chat transcript
 *  - then a routing strip showing the AI picking the right department
 *  - then a ticket card that gets auto-generated below
 *
 * All strings live in caseStudies.demos.callCenter.
 */

const waveformBars = Array.from({ length: 28 });

const PhoneIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.1 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
  </svg>
);

const CallCenterDemo = () => {
  const { t } = useLanguage();
  const demo = t("caseStudies.demos.callCenter");
  const {
    heading,
    subtitle,
    callLabel,
    callerLabel,
    agentLabel,
    transcript,
    departmentsTitle,
    departments,
    ticketTitle,
    ticketFields,
  } = demo;

  return (
    <div className="space-y-6">
      <div
        className="rounded-xl border border-green-400/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-5
                   theme-light:border-green-300/40 theme-light:from-green-50 theme-light:to-emerald-50"
      >
        <h4 className="text-base md:text-lg font-semibold text-white mb-2 theme-light:text-slate-900">{heading}</h4>
        <p className="text-sm text-white/75 leading-relaxed theme-light:text-slate-700">{subtitle}</p>
      </div>

      {/* Phone + Transcript */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Phone card */}
        <Motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-xl border border-white/15 bg-gradient-to-br from-slate-900/60 to-slate-800/40 p-5 flex flex-col items-center
                     theme-light:bg-white theme-light:border-slate-200 theme-light:from-white theme-light:to-slate-50"
        >
          <div className="flex items-center justify-between w-full mb-3">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold
                             bg-green-500/20 text-green-200 border border-green-400/30
                             theme-light:bg-green-100 theme-light:text-green-700 theme-light:border-green-200">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              {callLabel}
            </span>
            <span className="text-[10px] font-mono text-white/50 theme-light:text-slate-500">00:24</span>
          </div>

          <Motion.div
            className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg mb-4"
            animate={{ scale: [1, 1.08, 1], boxShadow: ["0 0 0 0 rgba(16,185,129,0.4)", "0 0 0 12px rgba(16,185,129,0)", "0 0 0 0 rgba(16,185,129,0)"] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            <PhoneIcon className="w-7 h-7 text-white" />
          </Motion.div>

          {/* Waveform */}
          <div className="w-full flex items-center justify-center gap-[3px] h-12">
            {waveformBars.map((_, i) => {
              const baseH = 6 + ((i * 13) % 22);
              return (
                <Motion.span
                  key={i}
                  className="w-1 rounded-full bg-gradient-to-t from-green-500 to-emerald-300 theme-light:from-green-500 theme-light:to-emerald-500"
                  initial={{ scaleY: 0.3 }}
                  animate={{ scaleY: [0.3, 1, 0.5, 1.1, 0.4] }}
                  transition={{
                    duration: 1.2 + (i % 4) * 0.2,
                    repeat: Infinity,
                    delay: i * 0.04,
                  }}
                  style={{ height: `${baseH}px`, transformOrigin: "center" }}
                />
              );
            })}
          </div>
        </Motion.div>

        {/* Transcript */}
        <div
          className="rounded-xl border border-white/15 bg-white/5 p-4 space-y-2 max-h-[260px] overflow-hidden
                     theme-light:bg-white theme-light:border-slate-200"
        >
          {transcript.map((msg, i) => {
            const isAgent = msg.speaker === "agent";
            return (
              <Motion.div
                key={`${i}-${msg.text}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.5, duration: 0.35 }}
                className={`flex ${isAgent ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs leading-relaxed
                  ${isAgent
                    ? "bg-gradient-to-br from-emerald-500/30 to-green-500/20 border border-emerald-400/30 text-emerald-100 rounded-br-sm theme-light:from-emerald-100 theme-light:to-green-50 theme-light:text-emerald-900 theme-light:border-emerald-200"
                    : "bg-white/10 border border-white/15 text-white/85 rounded-bl-sm theme-light:bg-slate-100 theme-light:text-slate-800 theme-light:border-slate-200"}`}>
                  <p className="text-[10px] uppercase tracking-wider font-semibold opacity-70 mb-0.5">
                    {isAgent ? agentLabel : callerLabel}
                  </p>
                  {msg.text}
                </div>
              </Motion.div>
            );
          })}
        </div>
      </div>

      {/* Routing strip */}
      <div
        className="rounded-xl border border-white/15 bg-white/5 p-4
                   theme-light:bg-white theme-light:border-slate-200"
      >
        <p className="text-[11px] uppercase tracking-wider text-green-300 font-semibold mb-3 theme-light:text-green-700">
          {departmentsTitle}
        </p>
        <div className="grid grid-cols-3 gap-2">
          {departments.map((d, i) => (
            <Motion.div
              key={d.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.12 }}
              className={`relative rounded-lg border px-3 py-2.5 text-center text-xs font-medium transition-colors
                ${d.selected
                  ? "border-emerald-400/60 bg-gradient-to-br from-emerald-500/30 to-green-500/20 text-emerald-100 theme-light:from-emerald-100 theme-light:to-green-50 theme-light:text-emerald-900 theme-light:border-emerald-300"
                  : "border-white/10 bg-white/5 text-white/60 theme-light:bg-slate-50 theme-light:border-slate-200 theme-light:text-slate-500"}`}
            >
              {d.selected ? (
                <Motion.span
                  className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-emerald-400"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
              ) : null}
              {d.name}
            </Motion.div>
          ))}
        </div>
      </div>

      {/* Ticket card */}
      <Motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.4 }}
        className="rounded-xl border border-emerald-400/40 bg-gradient-to-br from-emerald-500/15 to-green-500/10 p-4
                   theme-light:bg-white theme-light:border-emerald-300 theme-light:from-emerald-50 theme-light:to-green-50"
      >
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-mono font-bold text-emerald-200 theme-light:text-emerald-800">
            {ticketTitle}
          </p>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold
                           bg-emerald-500/20 text-emerald-200 border border-emerald-400/30
                           theme-light:bg-emerald-100 theme-light:text-emerald-800 theme-light:border-emerald-200">
            AUTO-GEN
          </span>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {ticketFields.map((f, i) => (
            <Motion.div
              key={f.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.25 + i * 0.1 }}
              className="flex flex-col"
            >
              <span className="text-[10px] uppercase tracking-wider text-white/50 theme-light:text-slate-500">
                {f.label}
              </span>
              <span className="text-xs font-medium text-white theme-light:text-slate-900">{f.value}</span>
            </Motion.div>
          ))}
        </div>
      </Motion.div>
    </div>
  );
};

export default CallCenterDemo;
