export function Tooltip({ votedRate }: { votedRate: number }) {
  return (
    <div
      id="tooltip-light"
      role="tooltip"
      className="absolute right-4 z-10 inline-block px-3 py-2 text-sm font-medium text-pink-400 bg-transparent border border-pink-400 rounded-lg shadow-sm animate-pulse"
    >
      You rated: {votedRate}
    </div>
  )
}
