# 🎙️ AI Interview Coach — Modern Frontend UI

A production-grade, accessible, and responsive user interface for the **AI Interview Coach**, crafted with **React 18**, **Vite**, **Tailwind CSS**, and **Lucide Icons** following the [Impeccable Design System](https://github.com/pbakaus/impeccable).

---

## ✨ Features & Architecture

- **Intake & Profile Setup**:
  - Drag-and-drop PDF Resume parser and text fallback mode.
  - Job Role & Job Description inputs with live character counting.
  - API Credentials modal for Mistral AI & Sarvam Speech AI keys with secure browser storage.
- **Adaptive 10-Question Interview Studio**:
  - Real-time question progress tracker (`Question X of 10`) with category tagging.
  - Audio playback for interviewer questions synthesized via Sarvam AI (`bulbul:v3`) with fallback to browser Web Speech API.
  - Live audio visualizer / pulsing waveform when recording or playing speech.
  - Dual response modes: Microphone voice recording with timer & playback preview or formatted text answers.
  - Expandable chronological transcript history drawer.
- **Executive Performance Report**:
  - Overall rating (/10) and hiring recommendation badge (*Strong Hire*, *Hire*, *Borderline*, *Needs Improvement*).
  - Semantic ATS compatibility score (/100) with keyword alignment analysis.
  - Detailed competency metrics: Technical Depth, Communication, Problem Solving, Confidence, and Resume Strength.
  - Demonstrated strengths vs. growth areas.
  - Actionable resume enhancement recommendations.
  - 4-Week structured learning roadmap with weekly milestones.
  - One-click Markdown copy and PDF print formatting.
- **Standalone & Full-Stack Ready**:
  - Automatically connects to the local FastAPI backend (`http://127.0.0.1:8000/api`).
  - Seamless simulated fallback mode if the backend is offline so all 10 questions and reports can be previewed anytime.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

The UI will be accessible at: **`http://localhost:5173`**

### 3. Build for Production
```bash
npm run build
```

---

## 🎨 Impeccable Craft Standards Applied

- **Color & Depth**: Deep slate neutral foundation (`#020617`, `#0f172a`) with subtle indigo accenting and accessible contrast ratios (≥ 4.5:1).
- **Typography**: Paired *Plus Jakarta Sans* and *JetBrains Mono* with negative tracking on headings and comfortable line measure (65–75ch).
- **Themed Surfaces**: Custom styled scrollbars, branded selection highlight, and intentional focus rings.
- **Anti-Pattern Defense**: Zero repetitive icon-card scaffolds, no decorative gradient text fills, no gratuitous glassmorphism, and consistent Lucide SVG icons (no raw emoji).
