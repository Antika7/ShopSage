import { useState, useMemo } from 'react'
import ProductCard from './ProductCard'

const SOURCES = ['All', 'Amazon', 'Flipkart', 'Myntra', 'Nykaa']

const SORT_OPTIONS = [
  { value: 'rating_desc', label: 'Top Rated' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'reviews_desc', label: 'Most Reviewed' },
]

function applyFilter(products, sourceFilter) {
  if (sourceFilter === 'All') return products
  return products.filter(
    (p) => p.source && p.source.toLowerCase() === sourceFilter.toLowerCase()
  )
}

function applySort(products, sortKey) {
  const arr = [...products]
  switch (sortKey) {
    case 'price_asc':
      return arr.sort((a, b) => (a.price || 0) - (b.price || 0))
    case 'price_desc':
      return arr.sort((a, b) => (b.price || 0) - (a.price || 0))
    case 'reviews_desc':
      return arr.sort((a, b) => (b.review_count || 0) - (a.review_count || 0))
    case 'rating_desc':
    default:
      return arr.sort((a, b) => (b.rating || 0) - (a.rating || 0))
  }
}

export default function ProductGrid({ products, bestPickTitle }) {
  const [sourceFilter, setSourceFilter] = useState('All')
  const [sortKey, setSortKey] = useState('rating_desc')

  const filtered = useMemo(
    () => applyFilter(products, sourceFilter),
    [products, sourceFilter]
  )

  const sorted = useMemo(() => applySort(filtered, sortKey), [filtered, sortKey])

  // Compute which sources actually exist in the data
  const availableSources = useMemo(() => {
    const set = new Set(products.map((p) => p.source?.toLowerCase()))
    return SOURCES.filter(
      (s) => s === 'All' || set.has(s.toLowerCase())
    )
  }, [products])

  return (
    <div className="space-y-4">
      {/* Controls bar */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          {/* Source filter tabs */}
          <div className="flex flex-wrap gap-2 flex-1">
            {availableSources.map((src) => (
              <button
                key={src}
                onClick={() => setSourceFilter(src)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                  sourceFilter === src
                    ? 'bg-sage-500 text-white border-sage-500'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-sage-300 hover:text-sage-600'
                }`}
              >
                {src}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <label htmlFor="sort-select" className="text-xs text-gray-500 font-medium">
              Sort by:
            </label>
            <select
              id="sort-select"
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent bg-white"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Count */}
      <p className="text-sm text-gray-500 px-1">
        Showing <span className="font-semibold text-gray-700">{sorted.length}</span>{' '}
        {sorted.length === 1 ? 'product' : 'products'}
        {sourceFilter !== 'All' && ` on ${sourceFilter}`}
      </p>

      {/* Grid */}
      {sorted.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sorted.map((product, idx) => (
            <ProductCard
              key={product.url || product.title || idx}
              product={product}
              isBestPick={
                bestPickTitle
                  ? product.title === bestPickTitle ||
                    product.title?.toLowerCase().includes(bestPickTitle.toLowerCase()) ||
                    bestPickTitle.toLowerCase().includes(product.title?.toLowerCase())
                  : false
              }
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400">
          No products match the selected filter.
        </div>
      )}
    </div>
  )
}
