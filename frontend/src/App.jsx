import React, { useState, useEffect } from 'react'
import Header        from './components/Header'
import SetupPage     from './components/SetupPage'
import InterviewPage from './components/InterviewPage'
import DossierPage   from './components/DossierPage'
import {
  checkBackendHealth,
  startInterviewSession,
  submitInterviewAnswer,
  synthesizeAudio,
} from './services/api'

export default function App() {
  const [stage, setStage]               = useState('setup') // 'setup' | 'interview' | 'dossier'
  const [isConnected, setIsConnected]   = useState(false)
  const [sessionData, setSessionData]   = useState(null)
  const [history, setHistory]           = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isTTSPlaying, setIsTTSPlaying] = useState(false)
  const [report, setReport]             = useState(null)
  const [activeAudio, setActiveAudio]   = useState(null)

  useEffect(() => {
    checkBackendHealth().then(r => setIsConnected(r.online))
  }, [])

  /* ── start interview ── */
  const handleStart = async (payload) => {
    setIsSubmitting(true)
    try {
      const res = await startInterviewSession(payload)
      if (res?.question) {
        setSessionData(res)
        setHistory([])
        setStage('interview')
      }
    } catch (err) {
      console.error('Failed to start session:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  /* ── TTS playback ── */
  const handlePlayTTS = async (text) => {
    if (!text) return
    setIsTTSPlaying(true)
    try {
      const url = await synthesizeAudio(text)
      if (url) {
        activeAudio?.pause()
        const audio = new Audio(url)
        setActiveAudio(audio)
        audio.onended = () => setIsTTSPlaying(false)
        audio.onerror = () => setIsTTSPlaying(false)
        await audio.play().catch(() => setIsTTSPlaying(false))
      } else {
        // Web Speech API fallback
        setTimeout(() => setIsTTSPlaying(false), Math.min(7000, text.length * 55))
      }
    } catch {
      setIsTTSPlaying(false)
    }
  }

  /* ── submit answer ── */
  const handleSubmitAnswer = async ({ audioBlob, answerText }) => {
    if (!sessionData) return
    setIsSubmitting(true)

    // Optimistic history append
    const newHistory = [...history, {
      question: sessionData.question,
      answer:   answerText || null,
      isVoice:  !!audioBlob,
      category: sessionData.category,
    }]
    setHistory(newHistory)

    try {
      const res = await submitInterviewAnswer({
        sessionId:            sessionData.sessionId,
        answerText,
        audioBlob,
        currentQuestionIndex: sessionData.currentQuestionIndex,
      })

      if (res.isFinal) {
        setReport(res.report)
        setStage('dossier')
      } else {
        setSessionData(prev => ({
          ...prev,
          currentQuestionIndex: res.currentQuestionIndex,
          question:             res.question,
          category:             res.category,
        }))
      }
    } catch (err) {
      console.error('Answer submission failed:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  /* ── reset ── */
  const handleReset = () => {
    activeAudio?.pause()
    setSessionData(null)
    setHistory([])
    setReport(null)
    setStage('setup')
  }

  return (
    <div className="min-h-screen flex flex-col bg-parchment-100">
      <Header
        onReset={handleReset}
        isConnected={isConnected}
        currentStage={stage}
      />

      <main className="flex-1">
        {stage === 'setup' && (
          <SetupPage onStart={handleStart} isSubmitting={isSubmitting} />
        )}
        {stage === 'interview' && (
          <InterviewPage
            sessionData={sessionData}
            onSubmitAnswer={handleSubmitAnswer}
            onPlayTTS={handlePlayTTS}
            onEndEarly={() => handleSubmitAnswer({ answerText: 'Candidate concluded session early.' })}
            isThinking={isSubmitting}
            isTTSPlaying={isTTSPlaying}
            history={history}
          />
        )}
        {stage === 'dossier' && (
          <DossierPage report={report} onRestart={handleReset} />
        )}
      </main>
    </div>
  )
}
