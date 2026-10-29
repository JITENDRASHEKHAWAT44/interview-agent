import React, { useState } from 'react'
import {
  RotateCcw, Download, Copy, Check, CheckCircle2, AlertTriangle,
  TrendingUp, FileText, Calendar, Award, Target,
} from 'lucide-react'
import Logo from './Logo'

/* ── Gauge / Donut ── */
function ScoreGauge({ score, max = 10, size = 120 }) {
  const pct = score / max
  const r = 40
  const circ = 2 * Math.PI * r
  const dash = circ * pct
  const gap  = circ - dash

  const color = pct >= 0.8 ? '#1A6B3F' : pct >= 0.6 ? '#B07A08' : '#C0392B'

  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r={r} fill="none" stroke="#E8DFD0" strokeWidth="9" />
      <circle
        cx="50" cy="50" r={r}
        fill="none" stroke={color} strokeWidth="9"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${gap}`}
        strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 1s ease-out' }}
      />
      <text x="50" y="46" textAnchor="middle" fontSize="20" fontWeight="700" fill="#100D07" fontFamily="DM Mono, monospace">
        {score}
      </text>
      <text x="50" y="60" textAnchor="middle" fontSize="9" fill="#8A7D6B" fontFamily="DM Sans, sans-serif">
        out of {max}
      </text>
    </svg>
  )
}

/* ── Competency row ── */
function CompetencyRow({ label, score, max = 10, summary }) {
  const pct = (score / max) * 100
  const barColor = pct >= 80 ? 'bg-jade-500' : pct >= 60 ? 'bg-amber-500' : 'bg-red-400'
  return (
    <div className="py-3 border-b border-parchment-100 last:border-0">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-semibold text-ink-800">{label}</span>
        <span className="font-mono text-sm font-bold text-ink-700">{score}<span className="text-ink-300 font-normal">/{max}</span></span>
      </div>
      <div className="h-2 bg-parchment-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${barColor} rounded-full transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {summary && <p className="mt-1 text-xs text-ink-400 leading-relaxed">{summary}</p>}
    </div>
  )
}

/* ── Verdict badge ── */
function Verdict({ rec }) {
  const styles = {
    'strong hire': 'bg-jade-100 text-jade-700 border-jade-200',
    'hire':        'bg-amber-50 text-amber-700 border-amber-200',
    'borderline':  'bg-orange-50 text-orange-700 border-orange-200',
    'no hire':     'bg-red-50 text-red-700 border-red-200',
  }
  const s = styles[rec?.toLowerCase()] || styles['hire']
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${s}`}>
      <Award className="w-3.5 h-3.5" />
      {rec}
    </span>
  )
}

/* ──────────────────────────────────────────────────
   MAIN: Evaluation Dossier
────────────────────────────────────────────────── */
export default function DossierPage({ report, onRestart }) {
  const [copied, setCopied] = useState(false)

  const {
    overallScore = 8.0,
    hiringRecommendation = 'Hire',
    recommendationReason = '',
    atsScore = 88,
    metrics = [],
    strengths = [],
    weaknesses = [],
    resumeImprovements = [],
    topicsToImprove = [],
    roadmap = [],
  } = report || {}

  const handleCopy = () => {
    const md = `# Candidate Evaluation Report\n\n**Verdict:** ${hiringRecommendation}\n**Score:** ${overallScore}/10\n**ATS:** ${atsScore}/100\n\n## Summary\n${recommendationReason}\n\n## Competencies\n${metrics.map(m => `- ${m.label}: ${m.score}/${m.max}`).join('\n')}\n\n## Strengths\n${strengths.map(s => `- ${s}`).join('\n')}\n\n## Growth Areas\n${weaknesses.map(w => `- ${w}`).join('\n')}\n\n## 4-Week Plan\n${roadmap.map(w => `Week ${w.week}: ${w.title}\n${w.focus}`).join('\n\n')}`
    navigator.clipboard.writeText(md)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-parchment-50">
      {/* ── Hero banner ── */}
      <div className="bg-white border-b border-parchment-200">
        <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-ink-400">Evaluation Complete</span>
              <span className="w-1 h-1 rounded-full bg-parchment-300" />
              <Verdict rec={hiringRecommendation} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-900">
              Candidate Performance Report
            </h1>
            <p className="text-ink-400 text-sm mt-1 max-w-lg leading-relaxed">
              {recommendationReason}
            </p>
          </div>
          <div className="flex-shrink-0">
            <ScoreGauge score={overallScore} max={10} size={120} />
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">

        {/* Row 1: ATS + Competencies */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* ATS Card */}
          <div className="card p-5 flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-400 mb-3">
              <Target className="w-3.5 h-3.5" />ATS Alignment
            </div>
            <div className="text-5xl font-bold font-mono text-ink-900">{atsScore}</div>
            <div className="text-ink-400 text-sm mt-0.5">out of 100</div>
            <div className="w-full h-2 bg-parchment-200 rounded-full mt-4 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  atsScore >= 80 ? 'bg-jade-500' : atsScore >= 60 ? 'bg-amber-500' : 'bg-red-400'
                }`}
                style={{ width: `${atsScore}%` }}
              />
            </div>
            <p className="text-xs text-ink-300 mt-2 leading-relaxed">Semantic keyword match vs. job description</p>
          </div>

          {/* Competencies */}
          <div className="card p-5 md:col-span-2">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-4 flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5" />Competency Breakdown
            </h2>
            {metrics.map((m, i) => (
              <CompetencyRow key={i} label={m.label} score={m.score} max={m.max} summary={m.summary} />
            ))}
          </div>
        </div>

        {/* Row 2: Strengths + Weaknesses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card p-5">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-jade-700 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5" />Demonstrated Strengths
            </h2>
            <ul className="space-y-3">
              {strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-ink-700 leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-jade-500 flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-5">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5" />Growth Areas
            </h2>
            <ul className="space-y-3">
              {weaknesses.map((w, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-ink-700 leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Row 3: Resume improvements */}
        {resumeImprovements.length > 0 && (
          <div className="card p-5">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-4 flex items-center gap-2">
              <FileText className="w-3.5 h-3.5" />Résumé Optimization
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {resumeImprovements.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-parchment-50 border border-parchment-200">
                  <span className="font-mono text-xs text-ink-300 font-bold mt-0.5">0{i + 1}</span>
                  <p className="text-sm text-ink-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Row 4: 4-Week Roadmap */}
        {roadmap.length > 0 && (
          <div className="card p-5">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-4 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />4-Week Preparation Sprint
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {roadmap.map((step, i) => (
                <div key={i} className="p-4 rounded-xl bg-parchment-50 border border-parchment-200 relative overflow-hidden">
                  <div className="absolute top-3 right-3 font-mono text-3xl font-bold text-parchment-300 leading-none select-none">
                    {step.week}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-700 font-bold">Week {step.week}</span>
                  <h3 className="font-semibold text-sm text-ink-900 mt-1 mb-1.5 pr-6">{step.title}</h3>
                  <p className="text-xs text-ink-500 leading-relaxed">{step.focus}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-parchment-200">
          <button onClick={onRestart} className="btn-secondary gap-2 w-full sm:w-auto justify-center">
            <RotateCcw className="w-4 h-4" />New Interview Session
          </button>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button onClick={handleCopy} className="btn-secondary gap-2">
              {copied ? <Check className="w-4 h-4 text-jade-600" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Markdown'}
            </button>
            <button onClick={() => window.print()} className="btn-primary gap-2">
              <Download className="w-4 h-4" />Print PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
