import React, { useState, useRef, useEffect } from 'react'
import {
  Mic, MicOff, Send, RefreshCw, Volume2, VolumeX,
  ChevronRight, PhoneOff, StopCircle, AlertCircle,
} from 'lucide-react'
import Logo from './Logo'

/* ──────────── Waveform animation bars ──────────── */
function VoiceWave({ active, speaking }) {
  const bars = 9
  return (
    <div className="flex items-center gap-0.5 h-6">
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className={`w-1 rounded-full transition-all ${
            active ? 'bg-red-500' : speaking ? 'bg-amber-600' : 'bg-parchment-400'
          }`}
          style={{
            height: active || speaking
              ? `${28 + Math.sin(Date.now() / 180 + i * 0.7) * 12}%`
              : '20%',
            animationName: active || speaking ? 'wave' : 'none',
            animationDuration: `${0.8 + i * 0.1}s`,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            animationDelay: `${i * 0.08}s`,
          }}
        />
      ))}
    </div>
  )
}

/* ──────────── AI message bubble ──────────── */
function AIBubble({ text, qIndex, total, category, onPlay, isPlaying }) {
  return (
    <div className="flex items-start gap-3 message-bubble-ai">
      {/* Avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-ink-800 border-2 border-parchment-200 flex items-center justify-center">
        <Logo size={20}
          className="[&_rect]:fill-transparent [&_path]:stroke-parchment-200"
        />
      </div>

      <div className="flex-1 max-w-2xl">
        {/* Question meta */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-ink-900">Shortlist AI</span>
          <span className="badge bg-parchment-100 text-ink-400 border border-parchment-200 text-[10px]">
            Q{qIndex} / {total}
          </span>
          {category && (
            <span className="badge bg-amber-50 text-amber-700 border border-amber-100 text-[10px]">
              {category}
            </span>
          )}
        </div>

        {/* Message */}
        <div className="bg-white border border-parchment-200 rounded-2xl rounded-tl-md px-4 py-3 shadow-xs">
          <p className="text-ink-800 text-sm leading-relaxed">{text}</p>
        </div>

        {/* Listen button */}
        <button
          onClick={onPlay}
          className={`mt-2 inline-flex items-center gap-1.5 text-xs font-medium transition-colors ${
            isPlaying ? 'text-amber-700' : 'text-ink-400 hover:text-ink-700'
          }`}
        >
          {isPlaying ? <><VoiceWave active={false} speaking={true} /><span className="ml-1">Speaking…</span></> : <><Volume2 className="w-3.5 h-3.5" />Listen</>}
        </button>
      </div>
    </div>
  )
}

/* ──────────── User message bubble ──────────── */
function UserBubble({ text, isVoice }) {
  return (
    <div className="flex items-start gap-3 justify-end message-bubble-user">
      <div className="flex-1 max-w-2xl flex flex-col items-end">
        <span className="text-xs font-semibold text-ink-900 mb-2">You</span>
        <div className="bg-ink-800 rounded-2xl rounded-tr-md px-4 py-3 shadow-xs max-w-lg">
          {isVoice && (
            <div className="flex items-center gap-2 mb-1 opacity-70">
              <Mic className="w-3 h-3 text-parchment-300" />
              <span className="text-parchment-400 text-[10px] uppercase tracking-wider font-semibold">Voice answer</span>
            </div>
          )}
          <p className="text-parchment-100 text-sm leading-relaxed">{text || '[Voice answer recorded]'}</p>
        </div>
      </div>
      {/* Avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-parchment-200 border-2 border-parchment-300 flex items-center justify-center text-xs font-bold text-ink-600">
        U
      </div>
    </div>
  )
}

/* ──────────── Thinking indicator ──────────── */
function ThinkingBubble() {
  return (
    <div className="flex items-start gap-3 message-bubble-ai">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-ink-800 border-2 border-parchment-200 flex items-center justify-center">
        <Logo size={20}
          className="[&_rect]:fill-transparent [&_path]:stroke-parchment-200"
        />
      </div>
      <div className="bg-white border border-parchment-200 rounded-2xl rounded-tl-md px-4 py-3 shadow-xs flex items-center gap-1.5">
        {[0, 1, 2].map(i => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-parchment-400 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  )
}

/* ──────────── Progress bar ──────────── */
function ProgressBar({ current, total }) {
  const pct = Math.round(((current - 1) / total) * 100)
  return (
    <div className="px-4 py-2.5 border-b border-parchment-200 bg-white flex items-center gap-3">
      <span className="text-xs font-semibold text-ink-700 flex-shrink-0">
        Question {current}<span className="text-ink-300">/{total}</span>
      </span>
      <div className="flex-1 h-1.5 bg-parchment-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-ink-800 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-ink-400 font-mono flex-shrink-0">{pct}%</span>
    </div>
  )
}

/* ──────────────────────────────────────────────────
   MAIN: Interview Conversation Page
────────────────────────────────────────────────── */
export default function InterviewPage({
  sessionData,
  onSubmitAnswer,
  onPlayTTS,
  onEndEarly,
  isThinking,
  isTTSPlaying,
  history,
}) {
  const [textAnswer, setTextAnswer] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [recordSeconds, setRecordSeconds] = useState(0)
  const [audioBlob, setAudioBlob] = useState(null)
  const [micError, setMicError] = useState('')
  const [inputMode, setInputMode] = useState('text') // 'text' | 'voice'

  const bottomRef = useRef(null)
  const textareaRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const timerRef = useRef(null)

  const { currentQuestionIndex = 1, totalQuestions = 10, question = '', category = '' } = sessionData || {}

  /* Auto-scroll to bottom */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history, isThinking, question])

  /* Auto-play TTS on new question */
  useEffect(() => {
    if (question) onPlayTTS(question)
    setTextAnswer('')
    setAudioBlob(null)
    setMicError('')
    setTimeout(() => textareaRef.current?.focus(), 200)
  }, [currentQuestionIndex, question])

  /* Recording timer */
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => setRecordSeconds(s => s + 1), 1000)
    } else {
      clearInterval(timerRef.current)
      setRecordSeconds(0)
    }
    return () => clearInterval(timerRef.current)
  }, [isRecording])

  const startRecording = async () => {
    setMicError('')
    audioChunksRef.current = []
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      mediaRecorderRef.current = recorder
      recorder.ondataavailable = e => { if (e.data.size > 0) audioChunksRef.current.push(e.data) }
      recorder.onstop = () => {
        setAudioBlob(new Blob(audioChunksRef.current, { type: 'audio/wav' }))
        stream.getTracks().forEach(t => t.stop())
      }
      recorder.start()
      setIsRecording(true)
    } catch {
      setMicError('Microphone access denied. Switch to text mode to continue.')
    }
  }

  const stopRecording = () => {
    mediaRecorderRef.current?.stop()
    setIsRecording(false)
  }

  const formatTime = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  const handleSubmit = () => {
    if (isThinking || isRecording) return
    if (!textAnswer.trim() && !audioBlob) {
      setMicError('Please type your answer or record a voice response.')
      return
    }
    onSubmitAnswer({ audioBlob, answerText: textAnswer.trim() })
    setTextAnswer('')
    setAudioBlob(null)
    setIsRecording(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit()
  }

  /* Build the rendered message list from history + current question */
  const messages = []
  history.forEach((h, i) => {
    messages.push({ type: 'ai', text: h.question, qIndex: i + 1, category: h.category })
    messages.push({ type: 'user', text: h.answer, isVoice: h.isVoice })
  })
  // current question at the end
  if (question) {
    messages.push({ type: 'ai', text: question, qIndex: currentQuestionIndex, category })
  }

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Progress bar */}
      <ProgressBar current={currentQuestionIndex} total={totalQuestions} />

      {/* ── Message thread ── */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-6">
        {/* Welcome message */}
        {messages.length === 0 && !question && (
          <div className="text-center text-ink-300 text-sm py-12">
            Your interview will begin shortly…
          </div>
        )}

        {messages.map((msg, idx) =>
          msg.type === 'ai' ? (
            <AIBubble
              key={idx}
              text={msg.text}
              qIndex={msg.qIndex}
              total={totalQuestions}
              category={msg.category}
              onPlay={() => onPlayTTS(msg.text)}
              isPlaying={isTTSPlaying && idx === messages.length - 1}
            />
          ) : (
            <UserBubble key={idx} text={msg.text} isVoice={msg.isVoice} />
          )
        )}

        {isThinking && <ThinkingBubble />}
        <div ref={bottomRef} />
      </div>

      {/* ── Input area ── */}
      <div className="border-t border-parchment-200 bg-white px-4 sm:px-8 py-4">
        {/* Mode switcher */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex rounded-lg overflow-hidden border border-parchment-300 text-xs">
            <button
              type="button"
              onClick={() => setInputMode('text')}
              className={`px-3 py-1.5 font-semibold transition-colors ${
                inputMode === 'text' ? 'bg-ink-800 text-white' : 'bg-white text-ink-400 hover:text-ink-700'
              }`}
            >Text</button>
            <button
              type="button"
              onClick={() => setInputMode('voice')}
              className={`px-3 py-1.5 font-semibold transition-colors ${
                inputMode === 'voice' ? 'bg-ink-800 text-white' : 'bg-white text-ink-400 hover:text-ink-700'
              }`}
            >Voice</button>
          </div>

          {audioBlob && inputMode === 'voice' && (
            <span className="text-xs font-medium text-jade-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-jade-500" />
              Voice answer recorded — ready to submit
            </span>
          )}

          {isRecording && (
            <span className="text-xs font-bold text-red-600 flex items-center gap-1.5 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              Recording {formatTime(recordSeconds)}
            </span>
          )}
        </div>

        {/* Input row */}
        <div className="flex items-end gap-3">
          {inputMode === 'text' ? (
            /* ── Text area ── */
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                rows={3}
                value={textAnswer}
                onChange={e => setTextAnswer(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isThinking}
                placeholder="Type your answer here… (Ctrl+Enter to submit)"
                className="input-field resize-none w-full pr-4 leading-relaxed disabled:opacity-50"
              />
              <p className="absolute bottom-2 right-3 text-[10px] text-ink-200 font-mono">{textAnswer.length}</p>
            </div>
          ) : (
            /* ── Voice input panel ── */
            <div className="flex-1 flex flex-col items-center justify-center gap-3 bg-parchment-50 border border-parchment-200 rounded-xl px-6 py-4 min-h-[80px]">
              <VoiceWave active={isRecording} speaking={isTTSPlaying} />
              <div className="flex items-center gap-3">
                {!isRecording ? (
                  <button
                    type="button"
                    onClick={startRecording}
                    disabled={isThinking}
                    className="btn-primary gap-2 py-2 text-sm disabled:opacity-50"
                  >
                    <Mic className="w-4 h-4" /> Start Recording
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={stopRecording}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-red-600 text-white shadow-sm hover:bg-red-700 active:scale-[0.98] transition-all"
                  >
                    <StopCircle className="w-4 h-4" /> Stop Recording
                  </button>
                )}
              </div>
              {audioBlob && (
                <button type="button" onClick={() => setAudioBlob(null)} className="text-xs text-red-500 hover:text-red-700">
                  Discard &amp; re-record
                </button>
              )}
            </div>
          )}

          {/* Action column */}
          <div className="flex flex-col gap-2 flex-shrink-0">
            <button
              onClick={handleSubmit}
              disabled={isThinking || isRecording || (!textAnswer.trim() && !audioBlob)}
              className="btn-primary py-3 px-4 disabled:opacity-40 disabled:cursor-not-allowed"
              title="Submit answer (Ctrl+Enter)"
            >
              {isThinking
                ? <RefreshCw className="w-4 h-4 animate-spin" />
                : <Send className="w-4 h-4" />
              }
            </button>
            <button
              onClick={onEndEarly}
              className="btn-ghost p-3 text-ink-300 hover:text-red-600 hover:bg-red-50"
              title="End interview early"
            >
              <PhoneOff className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Error */}
        {micError && (
          <p className="mt-2 text-xs text-red-600 font-medium flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />{micError}
          </p>
        )}

        {/* Footer hint */}
        <p className="mt-2 text-[11px] text-ink-300 text-center">
          {currentQuestionIndex < totalQuestions
            ? `${totalQuestions - currentQuestionIndex} question${totalQuestions - currentQuestionIndex !== 1 ? 's' : ''} remaining`
            : 'Last question — submit to receive your evaluation report'}
        </p>
      </div>
    </div>
  )
}
