const SOURCE_STYLES = {
  amazon: { label: 'Amazon', bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200' },
  flipkart: { label: 'Flipkart', bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
  myntra: { label: 'Myntra', bg: 'bg-pink-100', text: 'text-pink-700', border: 'border-pink-200' },
  nykaa: { label: 'Nykaa', bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' },
}

function getSourceStyle(source) {
  if (!source) return { label: source || 'Store', bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200' }
  const key = source.toLowerCase()
  return SOURCE_STYLES[key] || { label: source, bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200' }
}

function StarRating({ rating }) {
  if (!rating && rating !== 0) return null
  const value = parseFloat(rating)
  const stars = []
  for (let i = 1; i <= 5; i++) {
    if (value >= i) {
      stars.push(
        <span key={i} className="text-amber-400 text-base leading-none">&#9733;</span>
      )
    } else if (value >= i - 0.5) {
      stars.push(
        <span key={i} className="text-amber-300 text-base leading-none">&#9733;</span>
      )
    } else {
      stars.push(
        <span key={i} className="text-gray-300 text-base leading-none">&#9733;</span>
      )
    }
  }
  return (
    <span className="inline-flex items-center gap-0.5">
      {stars}
      <span className="text-xs text-gray-500 ml-1">{value.toFixed(1)}</span>
    </span>
  )
}

function ProductImage({ src, alt, large }) {
  const sizeClass = large ? 'w-28 h-28 sm:w-32 sm:h-32' : 'w-full h-40'

  if (!src) {
    return (
      <div className={`${sizeClass} bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
        <span className="text-gray-400 text-xs">No Image</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${sizeClass} object-contain rounded-lg flex-shrink-0 bg-gray-50`}
      onError={(e) => {
        e.currentTarget.style.display = 'none'
        e.currentTarget.nextSibling.style.display = 'flex'
      }}
    />
  )
}

export default function ProductCard({ product, isBestPick }) {
  const sourceStyle = getSourceStyle(product.source)
  const hasUrl = product.url && product.url !== '#'

  return (
    <div
      className={`bg-white rounded-xl border flex flex-col overflow-hidden transition-shadow hover:shadow-md ${
        isBestPick
          ? 'border-2 border-sage-500 ring-2 ring-sage-100 shadow-md'
          : 'border-gray-100 shadow-sm'
      }`}
    >
      {/* Best Pick Badge */}
      {isBestPick && (
        <div className="bg-sage-500 text-white text-xs font-semibold px-3 py-1 flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-3.5 h-3.5"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clipRule="evenodd"
            />
          </svg>
          Best Pick
        </div>
      )}

      {/* Image */}
      <div className="p-3 flex justify-center">
        <div className="w-full h-40 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.title}
              className="w-full h-full object-contain"
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

      {/* Content */}
      <div className="px-4 pb-4 flex flex-col flex-1 gap-2">
        {/* Source badge */}
        <span
          className={`self-start text-xs font-medium px-2 py-0.5 rounded border ${sourceStyle.bg} ${sourceStyle.text} ${sourceStyle.border}`}
        >
          {sourceStyle.label}
        </span>

        {/* Title */}
        <p
          className="text-sm font-medium text-gray-800 leading-snug overflow-hidden"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
          title={product.title}
        >
          {product.title}
        </p>

        {/* Price */}
        <p className="text-xl font-bold text-gray-900">
          {product.price_display || (product.price != null ? `₹${Number(product.price).toLocaleString('en-IN')}` : 'Price N/A')}
        </p>

        {/* Rating */}
        {(product.rating || product.rating === 0) && (
          <div className="flex items-center gap-2">
            <StarRating rating={product.rating} />
            {product.review_count != null && (
              <span className="text-xs text-gray-400">
                ({Number(product.review_count).toLocaleString('en-IN')})
              </span>
            )}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTA */}
        {hasUrl ? (
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center text-sm font-semibold text-white bg-sage-500 hover:bg-sage-600 rounded-lg py-2 transition-colors mt-1"
          >
            View Deal
          </a>
        ) : (
          <button
            disabled
            className="block w-full text-center text-sm font-semibold text-gray-400 bg-gray-100 rounded-lg py-2 cursor-not-allowed mt-1"
          >
            View Deal
          </button>
        )}
      </div>
    </div>
  )
}
