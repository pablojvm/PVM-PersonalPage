import { Fragment } from "react";
import { motion as Motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import TechOrchestration from "./TechOrchestration";

/**
 * CaseStudyDemos
 * --------------
 * Consolidated home for the 3 case-study demos. Each demo renders inside
 * a shared `DemoShell` that handles the colored header card + the
 * orchestration pipeline; the body of each demo is the unique
 * visualisation (calendar, document cascade, call-center dashboard).
 *
 * Exports SchedulerDemo, DocManagerDemo and CallCenterDemo. App.jsx
 * imports them from here so we only have one demos file to maintain.
 */

/* --------------------------- Shared shell --------------------------- */

const PALETTES = {
  scheduler: {
    border: "border-blue-400/30 theme-light:border-blue-300/40",
    bg: "from-blue-500/10 to-cyan-500/10 theme-light:from-blue-50 theme-light:to-cyan-50",
    accent: "from-cyan-400 to-blue-500",
  },
  docmanager: {
    border: "border-purple-400/30 theme-light:border-purple-300/40",
    bg: "from-purple-500/10 to-pink-500/10 theme-light:from-purple-50 theme-light:to-pink-50",
    accent: "from-purple-400 to-pink-400",
  },
  callCenter: {
    border: "border-green-400/30 theme-light:border-green-300/40",
    bg: "from-green-500/10 to-emerald-500/10 theme-light:from-green-50 theme-light:to-emerald-50",
    accent: "from-emerald-400 to-green-500",
  },
};

const DemoShell = ({ demoKey, children }) => {
  const { t } = useLanguage();
  const demo = t(`caseStudies.demos.${demoKey}`);
  const palette = PALETTES[demoKey];

  return (
    <div className="space-y-6">
      <div
        className={`rounded-xl border ${palette.border} bg-gradient-to-br ${palette.bg} p-5`}
      >
        <h4 className="text-base md:text-lg font-semibold text-white mb-2 theme-light:text-slate-900">
          {demo.heading}
        </h4>
        <p className="text-sm text-white/75 leading-relaxed theme-light:text-slate-700">
          {demo.subtitle}
        </p>
      </div>

      <TechOrchestration
        title={demo.orchestration.title}
        steps={demo.orchestration.steps}
        accent={palette.accent}
      />

      {children(demo)}
    </div>
  );
};

/* --------------------------- Scheduler --------------------------- */

const cellState = (dayIdx, shiftIdx) => {
  // Mon-Fri full on morning/afternoon, partial on night.
  // Weekend half coverage, no night shift.
  if (dayIdx < 5) return shiftIdx === 2 ? "med" : "full";
  return shiftIdx === 2 ? "none" : "med";
};

const cellClasses = {
  full: "bg-gradient-to-br from-cyan-400 to-blue-500 border-cyan-300/50",
  med: "bg-gradient-to-br from-cyan-500/40 to-blue-500/40 border-cyan-400/30",
  none: "bg-white/5 border-white/10 theme-light:bg-slate-100 theme-light:border-slate-200",
};

export const SchedulerDemo = () => (
  <DemoShell demoKey="scheduler">
    {(demo) => (
      <>
        {/* KPI strip */}
        <div className="grid grid-cols-3 gap-3">
          {demo.kpis.map((k, i) => (
            <Motion.div
              key={k.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.08, duration: 0.4 }}
              className="rounded-xl border border-white/15 bg-slate-900/40 px-4 py-4 text-center
                         theme-light:bg-white theme-light:border-slate-200 theme-light:shadow-sm"
            >
              <div
                className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent
                              theme-light:from-blue-600 theme-light:to-cyan-600"
              >
                {k.value}
              </div>
              <div className="text-[11px] uppercase tracking-wider text-white/60 mt-1 theme-light:text-slate-500">
                {k.label}
              </div>
            </Motion.div>
          ))}
        </div>

        {/* Calendar grid */}
        <div
          className="rounded-xl border border-white/15 bg-white/5 p-4 md:p-5
                     theme-light:bg-white theme-light:border-slate-200"
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-white/85 theme-light:text-slate-800">
              {demo.calendarTitle}
            </p>
            <span
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold
                             bg-cyan-500/20 text-cyan-200 border border-cyan-400/30
                             theme-light:bg-cyan-100 theme-light:text-cyan-700 theme-light:border-cyan-200"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
              LIVE
            </span>
          </div>

          <div className="grid grid-cols-[64px_repeat(7,minmax(0,1fr))] gap-1.5 text-[11px]">
            <div />
            {demo.days.map((d) => (
              <div
                key={d}
                className="text-center font-semibold text-white/60 theme-light:text-slate-500"
              >
                {d}
              </div>
            ))}

            {demo.shifts.map((shift, shiftIdx) => (
              <Fragment key={shift}>
                <div className="flex items-center text-white/60 theme-light:text-slate-500 pr-1">
                  {shift}
                </div>
                {demo.days.map((day, dayIdx) => {
                  const state = cellState(dayIdx, shiftIdx);
                  return (
                    <Motion.div
                      key={`${shift}-${day}`}
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.25 + (dayIdx + shiftIdx * 7) * 0.025,
                        duration: 0.25,
                      }}
                      className={`h-9 rounded-md border ${cellClasses[state]}`}
                    />
                  );
                })}
              </Fragment>
            ))}
          </div>
        </div>

        {/* Pipeline */}
        <div
          className="rounded-xl border border-white/15 bg-white/5 p-4 md:p-5
                     theme-light:bg-white theme-light:border-slate-200"
        >
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-3 md:gap-2">
            {demo.pipeline.map((step, index) => (
              <div key={step.label} className="flex md:flex-1 items-center gap-3">
                <Motion.div
                  className="w-full rounded-xl border border-white/20 bg-slate-800/60 px-4 py-3 text-center shadow-lg
                             theme-light:bg-slate-50 theme-light:border-slate-200"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.18, duration: 0.35 }}
                >
                  <p className="text-sm font-semibold text-white theme-light:text-slate-900">
                    {step.label}
                  </p>
                  <p className="text-[11px] text-white/65 mt-1 theme-light:text-slate-500">
                    {step.detail}
                  </p>
                </Motion.div>

                {index < demo.pipeline.length - 1 ? (
                  <Motion.span
                    className="text-xl text-cyan-300 font-bold hidden md:inline-block theme-light:text-cyan-600"
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ delay: index * 0.18 + 0.2, duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </Motion.span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </>
    )}
  </DemoShell>
);

/* --------------------------- DocManager --------------------------- */

const DocIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
    <path d="M14 3v6h6" />
    <path d="M8 13h8M8 17h6" />
  </svg>
);

export const DocManagerDemo = () => (
  <DemoShell demoKey="docmanager">
    {(demo) => (
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-stretch">
        {/* INPUT */}
        <div
          className="rounded-xl border border-white/15 bg-white/5 p-4
                     theme-light:bg-white theme-light:border-slate-200"
        >
          <p className="text-[11px] uppercase tracking-wider text-purple-300 font-semibold mb-3 theme-light:text-purple-700">
            {demo.inputTitle}
          </p>
          <div className="space-y-2">
            {demo.inputItems.map((item, i) => (
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
                  <p className="text-xs font-medium text-white truncate theme-light:text-slate-900">
                    {item.name}
                  </p>
                  <p className="text-[10px] text-white/50 theme-light:text-slate-500">
                    {item.tag}
                  </p>
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
            {demo.processingTitle}
          </p>
          <div className="space-y-3">
            {demo.processingSteps.map((step, i) => (
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
          transition={{ delay: 0.3 + demo.processingSteps.length * 0.6 }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] uppercase tracking-wider font-bold text-purple-700">
              {demo.outputTitle}
            </p>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-100 text-green-700 border border-green-200">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              OK
            </span>
          </div>

          <div className="space-y-2">
            {demo.outputFields.map((field, i) => (
              <Motion.div
                key={field.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + demo.processingSteps.length * 0.6 + i * 0.15 }}
                className="flex items-center justify-between gap-3 border-b border-slate-100 pb-1.5"
              >
                <span className="text-[11px] text-slate-500">{field.label}</span>
                <span className="text-xs font-mono font-medium text-slate-900">{field.value}</span>
              </Motion.div>
            ))}
          </div>
        </Motion.div>
      </div>
    )}
  </DemoShell>
);

/* --------------------------- CallCenter --------------------------- */

const waveformBars = Array.from({ length: 28 });

const PhoneIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.1 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
  </svg>
);

export const CallCenterDemo = () => (
  <DemoShell demoKey="callCenter">
    {(demo) => (
      <>
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
              <span
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold
                               bg-green-500/20 text-green-200 border border-green-400/30
                               theme-light:bg-green-100 theme-light:text-green-700 theme-light:border-green-200"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                {demo.callLabel}
              </span>
              <span className="text-[10px] font-mono text-white/50 theme-light:text-slate-500">
                00:24
              </span>
            </div>

            <Motion.div
              className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg mb-4"
              animate={{
                scale: [1, 1.08, 1],
                boxShadow: [
                  "0 0 0 0 rgba(16,185,129,0.4)",
                  "0 0 0 12px rgba(16,185,129,0)",
                  "0 0 0 0 rgba(16,185,129,0)",
                ],
              }}
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
            {demo.transcript.map((msg, i) => {
              const isAgent = msg.speaker === "agent";
              return (
                <Motion.div
                  key={`${i}-${msg.text}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.5, duration: 0.35 }}
                  className={`flex ${isAgent ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs leading-relaxed
                  ${
                    isAgent
                      ? "bg-gradient-to-br from-emerald-500/30 to-green-500/20 border border-emerald-400/30 text-emerald-100 rounded-br-sm theme-light:from-emerald-100 theme-light:to-green-50 theme-light:text-emerald-900 theme-light:border-emerald-200"
                      : "bg-white/10 border border-white/15 text-white/85 rounded-bl-sm theme-light:bg-slate-100 theme-light:text-slate-800 theme-light:border-slate-200"
                  }`}
                  >
                    <p className="text-[10px] uppercase tracking-wider font-semibold opacity-70 mb-0.5">
                      {isAgent ? demo.agentLabel : demo.callerLabel}
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
            {demo.departmentsTitle}
          </p>
          <div className="grid grid-cols-3 gap-2">
            {demo.departments.map((d, i) => (
              <Motion.div
                key={d.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.12 }}
                className={`relative rounded-lg border px-3 py-2.5 text-center text-xs font-medium transition-colors
                  ${
                    d.selected
                      ? "border-emerald-400/60 bg-gradient-to-br from-emerald-500/30 to-green-500/20 text-emerald-100 theme-light:from-emerald-100 theme-light:to-green-50 theme-light:text-emerald-900 theme-light:border-emerald-300"
                      : "border-white/10 bg-white/5 text-white/60 theme-light:bg-slate-50 theme-light:border-slate-200 theme-light:text-slate-500"
                  }`}
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
              {demo.ticketTitle}
            </p>
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold
                             bg-emerald-500/20 text-emerald-200 border border-emerald-400/30
                             theme-light:bg-emerald-100 theme-light:text-emerald-800 theme-light:border-emerald-200"
            >
              AUTO-GEN
            </span>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {demo.ticketFields.map((f, i) => (
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
                <span className="text-xs font-medium text-white theme-light:text-slate-900">
                  {f.value}
                </span>
              </Motion.div>
            ))}
          </div>
        </Motion.div>
      </>
    )}
  </DemoShell>
);
