import { useState } from 'react'

export default function RecommendationPanel({ rankedList }) {
  const [expanded, setExpanded] = useState(false)

  if (!rankedList || rankedList.length === 0) return null

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Toggle button */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-inset focus:ring-2 focus:ring-sage-500"
        aria-expanded={expanded}
      >
        <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4 text-sage-500"
          >
            <path
              fillRule="evenodd"
              d="M2 10.5a.75.75 0 01.75-.75h12.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10.5zM2 6.25A.75.75 0 012.75 5.5h12.5a.75.75 0 010 1.5H2.75A.75.75 0 012 6.25zM2.75 9a.75.75 0 000 1.5h9.5a.75.75 0 000-1.5h-9.5z"
              clipRule="evenodd"
            />
          </svg>
          See full AI ranking ({rankedList.length} products)
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Collapsible content */}
      <div
        style={{
          maxHeight: expanded ? `${rankedList.length * 80}px` : '0px',
          transition: 'max-height 0.35s ease-in-out',
          overflow: 'hidden',
        }}
      >
        <ol className="px-5 pb-4 space-y-2 divide-y divide-gray-50">
          {rankedList.map((item, idx) => (
            <li key={item.title || idx} className="pt-2 flex gap-3">
              {/* Rank number */}
              <span
                className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  idx === 0
                    ? 'bg-sage-500 text-white'
                    : idx === 1
                    ? 'bg-gray-200 text-gray-600'
                    : idx === 2
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {idx + 1}
              </span>
              {/* Content */}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-800 leading-snug truncate">
                  {item.title}
                </p>
                {item.score_explanation && (
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                    {item.score_explanation}
                  </p>
                )}
                {item.price && (
                  <p className="text-xs text-sage-600 font-semibold mt-0.5">
                    ₹{Number(item.price).toLocaleString('en-IN')}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
