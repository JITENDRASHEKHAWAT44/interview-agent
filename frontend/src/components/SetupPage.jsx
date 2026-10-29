import React, { useState, useRef } from 'react'
import {
  FileUp, Briefcase, FileText, ArrowRight,
  CheckCircle, AlertCircle, ChevronDown, ChevronUp,
} from 'lucide-react'
import Logo from './Logo'

const ROLE_PRESETS = [
  'AI / Machine Learning Engineer',
  'Backend Software Engineer',
  'Full Stack Developer',
  'Data Scientist',
  'DevOps / Platform Engineer',
  'Product Manager',
]

export default function SetupPage({ onStart, isSubmitting }) {
  const [jobRole, setJobRole] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [resumeMode, setResumeMode] = useState('file') // 'file' | 'text'
  const [resumeFile, setResumeFile] = useState(null)
  const [resumeText, setResumeText] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState('')
  const [showJDHint, setShowJDHint] = useState(false)
  const fileInputRef = useRef(null)

  /* ---- drag & drop ---- */
  const onDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer.files?.[0]
    if (f?.type === 'application/pdf' || f?.name?.endsWith('.pdf')) {
      setResumeFile(f)
      setError('')
    } else {
      setError('Please upload a PDF file.')
    }
  }

  /* ---- submit ---- */
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!jobRole.trim()) return setError('Please enter the target job role.')
    if (!jobDescription.trim()) return setError('Please paste the job description.')
    if (resumeMode === 'file' && !resumeFile && !resumeText) return setError('Please upload your resume or paste resume text.')
    if (resumeMode === 'text' && !resumeText.trim()) return setError('Please paste your resume text.')
    setError('')
    onStart({
      jobRole: jobRole.trim(),
      jobDescription: jobDescription.trim(),
      resumeFile: resumeMode === 'file' ? resumeFile : null,
      resumeText: resumeMode === 'text' ? resumeText.trim() : '',
    })
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex">
      {/* ── Left panel — hero / branding ── */}
      <div className="hidden lg:flex lg:w-[42%] bg-ink-800 flex-col justify-between p-12 relative overflow-hidden">
        {/* Subtle grid texture */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg,#fff 0px,#fff 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,#fff 0px,#fff 1px,transparent 1px,transparent 40px)',
          }}
        />

        <div className="relative z-10">
          <Logo size={44} className="[&_rect]:fill-parchment-200/10 [&_path]:stroke-parchment-300" />
          <p className="mt-4 text-xs font-mono uppercase tracking-widest text-parchment-400">
            Shortlist - AI Interview Coach
          </p>
          <h1 className="font-serif text-4xl text-parchment-100 mt-2 leading-tight">
            Your adaptive<br />interview coach.
          </h1>
          <p className="mt-4 text-parchment-400 text-sm leading-relaxed max-w-sm">
            10 adaptive questions powered by Mistral AI, calibrated against your résumé and the target role. Voice or text — your choice.
          </p>
        </div>

        {/* Feature list */}
        <div className="relative z-10 space-y-4">
          {[
            ['Résumé-aware depth probing', 'Questions tailored to your exact experience'],
            ['Adaptive difficulty', 'Harder when you\'re strong, supportive when you struggle'],
            ['Voice + text hybrid', 'Answer by speaking or typing'],
            ['Executive evaluation report', 'ATS score, roadmap, and hiring recommendation'],
          ].map(([title, desc]) => (
            <div key={title} className="flex items-start gap-3">
              <span className="mt-0.5 w-5 h-5 rounded-full bg-parchment-300/20 border border-parchment-300/30 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-3 h-3 text-parchment-300" />
              </span>
              <div>
                <p className="text-parchment-200 text-sm font-medium">{title}</p>
                <p className="text-parchment-500 text-xs leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel — intake form ── */}
      <div className="flex-1 flex flex-col justify-center px-6 py-10 sm:px-12 lg:px-16 overflow-y-auto">
        <div className="max-w-[500px] w-full mx-auto">
          {/* Mobile brand header */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <Logo size={28} />
            <span className="font-serif text-lg text-ink-900">Shortlist</span>
            <span className="text-ink-400 text-xs">- AI Interview Coach</span>
          </div>

          <h2 className="text-2xl font-semibold text-ink-900 tracking-tight mb-1">Configure your interview</h2>
          <p className="text-ink-400 text-sm mb-8">Set up the role, paste the JD, and upload your résumé to begin.</p>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Job Role */}
            <div>
              <label className="label">Target Role</label>
              <div className="relative">
                <input
                  className="input-field pr-10"
                  value={jobRole}
                  onChange={e => setJobRole(e.target.value)}
                  placeholder="e.g. Senior ML Engineer"
                />
                <Briefcase className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-300 pointer-events-none" />
              </div>
              {/* Role preset chips */}
              <div className="mt-2 flex flex-wrap gap-1.5">
                {ROLE_PRESETS.map(r => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setJobRole(r)}
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors ${
                      jobRole === r
                        ? 'bg-ink-800 text-parchment-50 border-ink-800'
                        : 'bg-parchment-100 text-ink-500 border-parchment-300 hover:border-ink-400 hover:text-ink-700'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Job Description */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="label mb-0">Job Description</label>
                <button
                  type="button"
                  onClick={() => setShowJDHint(!showJDHint)}
                  className="text-xs text-ink-400 hover:text-ink-600 flex items-center gap-1 transition-colors"
                >
                  {showJDHint ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  What to include
                </button>
              </div>
              {showJDHint && (
                <div className="mb-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 leading-relaxed">
                  Paste the full JD — responsibilities, required skills, and tech stack. The AI uses this to generate role-relevant questions.
                </div>
              )}
              <textarea
                rows={4}
                className="input-field resize-none"
                value={jobDescription}
                onChange={e => setJobDescription(e.target.value)}
                placeholder="Paste the full job description here…"
              />
              <p className="mt-1 text-right text-xs text-ink-300 font-mono">{jobDescription.length} chars</p>
            </div>

            {/* Resume */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="label mb-0">Résumé</label>
                <div className="flex rounded-lg overflow-hidden border border-parchment-300 text-xs">
                  <button
                    type="button"
                    onClick={() => setResumeMode('file')}
                    className={`px-3 py-1 font-medium transition-colors ${
                      resumeMode === 'file' ? 'bg-ink-800 text-white' : 'bg-white text-ink-400 hover:text-ink-600'
                    }`}
                  >PDF upload</button>
                  <button
                    type="button"
                    onClick={() => setResumeMode('text')}
                    className={`px-3 py-1 font-medium transition-colors ${
                      resumeMode === 'text' ? 'bg-ink-800 text-white' : 'bg-white text-ink-400 hover:text-ink-600'
                    }`}
                  >Paste text</button>
                </div>
              </div>

              {resumeMode === 'file' ? (
                <div>
                  <div
                    onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={onDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                      dragOver ? 'border-ink-500 bg-parchment-200' : 'border-parchment-300 bg-parchment-50 hover:border-ink-400 hover:bg-parchment-100'
                    }`}
                  >
                    <input ref={fileInputRef} type="file" accept=".pdf" className="hidden" onChange={e => setResumeFile(e.target.files?.[0] || null)} />
                    <FileUp className="w-6 h-6 text-ink-400 mx-auto mb-2" />
                    {resumeFile ? (
                      <div>
                        <p className="text-sm font-semibold text-jade-600 flex items-center justify-center gap-1.5">
                          <CheckCircle className="w-4 h-4" /> {resumeFile.name}
                        </p>
                        <p className="text-xs text-ink-300 mt-0.5">{(resumeFile.size/1024).toFixed(1)} KB</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-ink-600 font-medium">Drop your PDF here</p>
                        <p className="text-xs text-ink-300 mt-0.5">or click to browse — up to 10 MB</p>
                      </div>
                    )}
                  </div>
                  {resumeFile && (
                    <button type="button" onClick={() => setResumeFile(null)} className="mt-1.5 text-xs text-red-500 hover:text-red-700 font-medium">
                      Remove file
                    </button>
                  )}
                </div>
              ) : (
                <textarea
                  rows={5}
                  className="input-field resize-none font-mono text-xs"
                  value={resumeText}
                  onChange={e => setResumeText(e.target.value)}
                  placeholder="Paste your résumé text — experience, skills, education…"
                />
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-parchment-300 border-t-transparent animate-spin" />
                  Preparing your interview…
                </>
              ) : (
                <>Start Interview <ArrowRight className="w-4 h-4" /></>
              )}
            </button>

            <p className="text-center text-xs text-ink-300">
              10 adaptive questions · Voice &amp; text answers · Full evaluation report
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
