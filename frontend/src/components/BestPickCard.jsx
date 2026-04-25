const SOURCE_STYLES = {
  amazon: { label: 'Amazon', bg: 'bg-orange-100', text: 'text-orange-700' },
  flipkart: { label: 'Flipkart', bg: 'bg-blue-100', text: 'text-blue-700' },
  myntra: { label: 'Myntra', bg: 'bg-pink-100', text: 'text-pink-700' },
  nykaa: { label: 'Nykaa', bg: 'bg-red-100', text: 'text-red-700' },
}

function getSourceStyle(source) {
  if (!source) return { label: 'Store', bg: 'bg-gray-100', text: 'text-gray-700' }
  const key = source.toLowerCase()
  return SOURCE_STYLES[key] || { label: source, bg: 'bg-gray-100', text: 'text-gray-700' }
}

function StarRating({ rating }) {
  if (!rating && rating !== 0) return null
  const value = parseFloat(rating)
  const stars = []
  for (let i = 1; i <= 5; i++) {
    if (value >= i) stars.push(<span key={i} className="text-amber-400">&#9733;</span>)
    else if (value >= i - 0.5) stars.push(<span key={i} className="text-amber-300">&#9733;</span>)
    else stars.push(<span key={i} className="text-gray-300">&#9733;</span>)
  }
  return (
    <span className="inline-flex items-center gap-0.5 text-lg leading-none">
      {stars}
      <span className="text-sm text-gray-500 ml-1">{value.toFixed(1)}</span>
    </span>
  )
}

export default function BestPickCard({ bestPick, reasoning }) {
  if (!bestPick) return null

  const sourceStyle = getSourceStyle(bestPick.source)
  const hasUrl = bestPick.url && bestPick.url !== '#'

  return (
    <div className="bg-sage-50 rounded-xl shadow-md border-l-4 border-sage-500 border border-sage-100 overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 border-b border-sage-100 flex items-center gap-2">
        <span className="text-2xl">🏆</span>
        <div>
          <h2 className="text-xl font-bold text-sage-700 leading-tight">
            ShopSage Recommends
          </h2>
          <p className="text-sage-600 text-sm">
            Our AI picked the best option for you
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="flex flex-col sm:flex-row gap-5">
          {/* Product Image */}
          <div className="flex-shrink-0 flex justify-center">
            <div className="w-28 h-28 sm:w-32 sm:h-32 bg-white rounded-xl border border-sage-100 shadow-sm flex items-center justify-center overflow-hidden">
              {bestPick.image_url ? (
                <img
                  src={bestPick.image_url}
                  alt={bestPick.title}
                  className="w-full h-full object-contain p-1"
                  onError={(e) => {
                    e.currentTarget.parentNode.innerHTML =
                      '<div class="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Image</div>'
                  }}
                />
              ) : (
                <span className="text-gray-400 text-xs">No Image</span>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1 space-y-2 min-w-0">
            {/* Source badge */}
            <span
              className={`inline-block text-xs font-medium px-2 py-0.5 rounded ${sourceStyle.bg} ${sourceStyle.text}`}
            >
              {sourceStyle.label}
            </span>

            {/* Title */}
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-snug">
              {bestPick.title}
            </h3>

            {/* Price */}
            <p className="text-2xl font-bold text-gray-900">
              {bestPick.price_display || (bestPick.price != null ? `₹${Number(bestPick.price).toLocaleString('en-IN')}` : 'Price N/A')}
            </p>

            {/* Rating + Reviews */}
            <div className="flex items-center gap-3 flex-wrap">
              {(bestPick.rating || bestPick.rating === 0) && (
                <StarRating rating={bestPick.rating} />
              )}
              {bestPick.review_count != null && (
                <span className="text-sm text-gray-500">
                  {Number(bestPick.review_count).toLocaleString('en-IN')} reviews
                </span>
              )}
            </div>

            {/* Why this pick */}
            {reasoning && (
              <div className="mt-3 bg-white rounded-lg border border-sage-100 px-4 py-3">
                <p className="text-xs font-semibold text-sage-600 uppercase tracking-wide mb-1">
                  Why this pick?
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">{reasoning}</p>
              </div>
            )}

            {/* CTA */}
            <div className="pt-1">
              {hasUrl ? (
                <a
                  href={bestPick.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-sage-500 hover:bg-sage-600 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
                >
                  Buy Now on {sourceStyle.label}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </a>
              ) : (
                <button
                  disabled
                  className="inline-flex items-center gap-2 bg-gray-300 text-gray-500 font-semibold px-6 py-2.5 rounded-lg text-sm cursor-not-allowed"
                >
                  Buy Now on {sourceStyle.label}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
