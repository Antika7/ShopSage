export default function LocationBanner({ location, locationLoading }) {
  if (locationLoading) {
    return (
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-400 text-sm rounded-full px-4 py-1.5 animate-pulse">
          <span className="w-4 h-4 rounded-full bg-gray-300" />
          <span>Detecting location...</span>
        </div>
      </div>
    )
  }

  if (!location) return null

  const display =
    location.city && location.city !== location.country
      ? `${location.city}, ${location.country}`
      : location.country || 'India'

  return (
    <div className="flex justify-center">
      <div className="inline-flex items-center gap-2 bg-sage-50 border border-sage-100 text-sage-700 text-sm rounded-full px-4 py-1.5 shadow-sm">
        {/* Location pin icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4 text-sage-500 flex-shrink-0"
        >
          <path
            fillRule="evenodd"
            d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.387 1.445-.966 2.274-1.765C15.302 15.01 17 12.58 17 9.5a7 7 0 10-14 0c0 3.08 1.698 5.51 3.354 7.083a13.649 13.649 0 002.274 1.765 11.842 11.842 0 00.757.433 7.01 7.01 0 00.281.14l.018.008.006.003zM10 11.5a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
          />
        </svg>
        <span>
          Shopping from: <span className="font-semibold">{display}</span>
        </span>
      </div>
    </div>
  )
}
