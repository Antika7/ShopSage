import { useEffect, useState } from 'react'

function PulsingDots() {
  const [dotCount, setDotCount] = useState(1)

  useEffect(() => {
    const id = setInterval(() => {
      setDotCount((n) => (n % 3) + 1)
    }, 500)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="inline-block w-6 text-left">
      {'.'.repeat(dotCount)}
    </span>
  )
}

export default function LoadingSpinner({ variant }) {
  if (variant === 'search') {
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-6 py-8 flex flex-col items-center gap-4">
        {/* Animated shopping bag icons */}
        <div className="flex gap-3">
          {['Amazon', 'Flipkart', 'Myntra', 'Nykaa'].map((store) => (
            <div
              key={store}
              className="flex flex-col items-center gap-1 animate-pulse"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: storeBgColor(store) }}>
                {store[0]}
              </div>
              <span className="text-gray-400 text-xs">{store}</span>
            </div>
          ))}
        </div>
        <p className="text-gray-600 font-medium text-sm text-center">
          Searching across Amazon, Flipkart, Myntra, Nykaa
          <PulsingDots />
        </p>
      </div>
    )
  }

  if (variant === 'recommend') {
    return (
      <div className="bg-sage-50 border border-sage-100 rounded-xl px-6 py-8 flex flex-col items-center gap-4">
        <div className="relative">
          <svg
            className="w-12 h-12 animate-spin text-sage-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-20"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-80"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z"
            />
          </svg>
          {/* Leaf in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-sage-600"
            >
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-9 2 1-1 2.5-2 5-3C13 1 9.5 3 7 5.5c-1 1-2 2.5-2 4 0 1.5.5 3 1.5 4.5C7.8 15.73 9 17.5 9 19c0 .17 0 .34-.03.5A8 8 0 0010 9c.86.86 2 2.5 2 5 0-1-.5-4.5-3-6 3 .5 6 3 7 7 .22-1.5.22-3.5-1-5 3 1 4 4 4 6 0-5-3-10-9-11C12 4 15 5 17 8z" />
            </svg>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sage-700 font-semibold">ShopSage AI is analyzing products...</p>
          <p className="text-sage-600 text-sm mt-1">Finding the best value for your money</p>
        </div>
      </div>
    )
  }

  // Default spinner
  return (
    <div className="flex justify-center py-8">
      <svg
        className="w-10 h-10 animate-spin text-sage-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
    </div>
  )
}

function storeBgColor(store) {
  const map = {
    Amazon: '#FF9900',
    Flipkart: '#2874F0',
    Myntra: '#FF3F6C',
    Nykaa: '#FC2779',
  }
  return map[store] || '#6b7280'
}
