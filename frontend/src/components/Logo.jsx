// Custom logo — abstract "S" bracket wrapping a signal pulse, representing Shortlist
export default function ShortlistLogo({ size = 32, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Shortlist logo"
    >
      {/* Outer rounded square */}
      <rect x="1.5" y="1.5" width="37" height="37" rx="10" fill="#1C160D" />

      {/* Signal waveform — voice / interview pulse */}
      <path
        d="M6 20 C8 15, 10.5 13, 12.5 20 C14.5 27, 16.5 11, 19 20 C21.5 29, 23.5 15, 25.5 20 C27.5 25, 29 18, 32 20"
        stroke="#F9F6EE"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Checkmark tick above wave — "shortlisted" */}
      <path
        d="M26.5 10.5 L29.5 13.5 L34 8"
        stroke="#C4B49A"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
