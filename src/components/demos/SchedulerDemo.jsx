import { Fragment } from "react";
import { motion as Motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import TechOrchestration from "./TechOrchestration";


const cellState = (dayIdx, shiftIdx) => {
  // Mon-Fri (0-4) full coverage on morning/afternoon, partial on night.
  // Weekend (5-6) only morning/afternoon, half intensity.
  if (dayIdx < 5) {
    if (shiftIdx === 2) return "med"; // night
    return "full";
  }
  if (shiftIdx === 2) return "none";
  return "med";
};

const stateClasses = {
  full: "bg-gradient-to-br from-cyan-400 to-blue-500 border-cyan-300/50",
  med: "bg-gradient-to-br from-cyan-500/40 to-blue-500/40 border-cyan-400/30",
  none: "bg-white/5 border-white/10 theme-light:bg-slate-100 theme-light:border-slate-200",
};

const SchedulerDemo = () => {
  const { t } = useLanguage();
  const demo = t("caseStudies.demos.scheduler");
  const { heading, subtitle, orchestration, kpis, calendarTitle, days, shifts, pipeline } = demo;

  return (
    <div className="space-y-6">
      <div
        className="rounded-xl border border-blue-400/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-5
                   theme-light:border-blue-300/40 theme-light:from-blue-50 theme-light:to-cyan-50"
      >
        <h4 className="text-base md:text-lg font-semibold text-white mb-2 theme-light:text-slate-900">
          {heading}
        </h4>
        <p className="text-sm text-white/75 leading-relaxed theme-light:text-slate-700">
          {subtitle}
        </p>
      </div>

      <TechOrchestration
        title={orchestration.title}
        steps={orchestration.steps}
        accent="from-cyan-400 to-blue-500"
      />

      {/* KPI strip */}
      <div className="grid grid-cols-3 gap-3">
        {kpis.map((k, i) => (
          <Motion.div
            key={k.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + i * 0.08, duration: 0.4 }}
            className="rounded-xl border border-white/15 bg-slate-900/40 px-4 py-4 text-center
                       theme-light:bg-white theme-light:border-slate-200 theme-light:shadow-sm"
          >
            <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent
                            theme-light:from-blue-600 theme-light:to-cyan-600">
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
          <p className="text-sm font-medium text-white/85 theme-light:text-slate-800">{calendarTitle}</p>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold
                           bg-cyan-500/20 text-cyan-200 border border-cyan-400/30
                           theme-light:bg-cyan-100 theme-light:text-cyan-700 theme-light:border-cyan-200">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
            LIVE
          </span>
        </div>

        <div className="grid grid-cols-[64px_repeat(7,minmax(0,1fr))] gap-1.5 text-[11px]">
          <div />
          {days.map((d) => (
            <div key={d} className="text-center font-semibold text-white/60 theme-light:text-slate-500">
              {d}
            </div>
          ))}

          {shifts.map((shift, shiftIdx) => (
            <Fragment key={shift}>
              <div className="flex items-center text-white/60 theme-light:text-slate-500 pr-1">
                {shift}
              </div>
              {days.map((day, dayIdx) => {
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
                    className={`h-9 rounded-md border ${stateClasses[state]}`}
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
          {pipeline.map((step, index) => (
            <div key={step.label} className="flex md:flex-1 items-center gap-3">
              <Motion.div
                className="w-full rounded-xl border border-white/20 bg-slate-800/60 px-4 py-3 text-center shadow-lg
                           theme-light:bg-slate-50 theme-light:border-slate-200"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.18, duration: 0.35 }}
              >
                <p className="text-sm font-semibold text-white theme-light:text-slate-900">{step.label}</p>
                <p className="text-[11px] text-white/65 mt-1 theme-light:text-slate-500">{step.detail}</p>
              </Motion.div>

              {index < pipeline.length - 1 ? (
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
    </div>
  );
};

export default SchedulerDemo;
