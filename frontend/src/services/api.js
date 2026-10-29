import { MOCK_INTERVIEW_QUESTIONS, MOCK_FINAL_REPORT } from '../utils/mockData'

const API_BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '')

export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`)
    if (res.ok) return { online: true, ...(await res.json()) }
  } catch (_) {}
  return { online: false }
}

export async function startInterviewSession({ resumeText, resumeFile, jobRole, jobDescription }) {
  try {
    const form = new FormData()
    form.append('job_role', jobRole)
    form.append('job_description', jobDescription)
    if (resumeFile) form.append('resume_file', resumeFile)
    else if (resumeText) form.append('resume_text', resumeText)

    const res = await fetch(`${API_BASE}/start-interview`, { method: 'POST', body: form })
    if (res.ok) return await res.json()
  } catch (_) {
    console.warn('Backend unavailable — running in simulation mode.')
  }

  // ── Graceful standalone fallback ──
  return {
    sessionId:            'session-' + Date.now(),
    currentQuestionIndex: 1,
    totalQuestions:       10,
    question:             MOCK_INTERVIEW_QUESTIONS[0],
    category:             'Introduction',
    isFinal:              false,
    offlineMode:          true,
  }
}

export async function submitInterviewAnswer({ sessionId, answerText, audioBlob, currentQuestionIndex }) {
  try {
    const form = new FormData()
    form.append('session_id', sessionId)
    form.append('question_index', String(currentQuestionIndex))
    if (answerText) form.append('answer_text', answerText)
    if (audioBlob) form.append('audio_file', audioBlob, 'answer.wav')

    const res = await fetch(`${API_BASE}/submit-answer`, { method: 'POST', body: form })
    if (res.ok) return await res.json()
  } catch (_) {
    console.warn('Backend unavailable — advancing client-side.')
  }

  // ── Client-side progression fallback ──
  const next = currentQuestionIndex + 1
  if (next > 10) {
    return { isFinal: true, report: MOCK_FINAL_REPORT }
  }

  const categories = [
    'Introduction', 'Résumé Deep Dive', 'Technical Architecture',
    'Problem Solving', 'System Design', 'Behavioural',
    'Scenario & Edge Cases', 'Tools & Frameworks', 'Production Scaling', 'Final Thoughts'
  ]

  return {
    isFinal:              false,
    currentQuestionIndex: next,
    totalQuestions:       10,
    question:             MOCK_INTERVIEW_QUESTIONS[next - 1] ?? 'What questions do you have for us?',
    category:             categories[next - 1] ?? 'Technical',
  }
}

export async function synthesizeAudio(text) {
  try {
    const res = await fetch(`${API_BASE}/tts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })
    if (res.ok) return URL.createObjectURL(await res.blob())
  } catch (_) {
    console.warn('TTS backend unavailable — using Web Speech API.')
  }

  // Browser Web Speech API fallback
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()
    const utt = new SpeechSynthesisUtterance(text)
    utt.rate = 0.95
    utt.pitch = 1.0
    window.speechSynthesis.speak(utt)
  }
  return null
}
