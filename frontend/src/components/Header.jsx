import React from 'react'
import { RotateCcw } from 'lucide-react'
import Logo from './Logo'

export default function Header({ onReset, isConnected, currentStage }) {
  return (
    <header className="h-14 px-4 sm:px-6 border-b border-parchment-200 bg-white/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <Logo size={32} />
        <div className="flex items-center gap-2">
          <span className="font-serif text-lg text-ink-900 tracking-tight">Shortlist</span>
          <span className="text-parchment-400 font-light">-</span>
          <span className="text-xs text-ink-500 font-medium">AI Interview Coach</span>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        {/* Connection indicator */}
        <div className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
          isConnected
            ? 'bg-jade-50 text-jade-700 border-jade-100'
            : 'bg-parchment-100 text-ink-400 border-parchment-200'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${
            isConnected ? 'bg-jade-500 animate-pulse-soft' : 'bg-parchment-400'
          }`} />
          {isConnected ? 'Engine Active' : 'Simulation Mode'}
        </div>

        {currentStage !== 'setup' && (
          <button onClick={onReset} className="btn-secondary text-xs gap-1.5">
            <RotateCcw className="w-3.5 h-3.5" />
            <span>New Session</span>
          </button>
        )}
      </div>
    </header>
  )
}
