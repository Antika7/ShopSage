import { useState } from 'react'
import { searchProducts, getRecommendation } from './api/client'
import { useLocation } from './hooks/useLocation'
import LocationBanner from './components/LocationBanner'
import SearchForm from './components/SearchForm'
import LoadingSpinner from './components/LoadingSpinner'
import BestPickCard from './components/BestPickCard'
import RecommendationPanel from './components/RecommendationPanel'
import ProductGrid from './components/ProductGrid'

function LeafIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-7 h-7 text-sage-500"
    >
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-9 2 1-1 2.5-2 5-3C13 1 9.5 3 7 5.5c-1 1-2 2.5-2 4 0 1.5.5 3 1.5 4.5C7.8 15.73 9 17.5 9 19c0 .17 0 .34-.03.5A8 8 0 0010 9c.86.86 2 2.5 2 5 0-1-.5-4.5-3-6 3 .5 6 3 7 7 .22-1.5.22-3.5-1-5 3 1 4 4 4 6 0-5-3-10-9-11C12 4 15 5 17 8z" />
    </svg>
  )
}

export default function App() {
  const { location, locationLoading } = useLocation()
  const [searchResults, setSearchResults] = useState(null)
  const [recommendation, setRecommendation] = useState(null)
  const [loading, setLoading] = useState({ search: false, recommend: false })
  const [error, setError] = useState(null)
  const [lastFormData, setLastFormData] = useState(null)

  async function handleSearch(formData) {
    setLastFormData(formData)
    setSearchResults(null)
    setRecommendation(null)
    setError(null)
    setLoading({ search: true, recommend: false })

    let products = null

    try {
      const searchPayload = {
        productName: formData.productName,
        maxPrice: formData.maxPrice || null,
        brandPreference: formData.brandPreference || null,
        country: location?.country_code || 'IN',
      }
      const data = await searchProducts(searchPayload)
      products = data.products || []
      setSearchResults(products)
    } catch (err) {
      setError(`Search failed: ${err.message}`)
      setLoading({ search: false, recommend: false })
      return
    }

    if (!products.length) {
      setLoading({ search: false, recommend: false })
      return
    }

    setLoading({ search: false, recommend: true })

    try {
      const recPayload = {
        productName: formData.productName,
        products,
        maxPrice: formData.maxPrice || null,
        brandPreference: formData.brandPreference || null,
        userLocation: location ? `${location.city}, ${location.country}` : null,
      }
      const recData = await getRecommendation(recPayload)
      setRecommendation(recData)
    } catch (err) {
      setError(`Recommendation failed: ${err.message}`)
    }

    setLoading({ search: false, recommend: false })
  }

  const isLoading = loading.search || loading.recommend
  const hasResults = searchResults && searchResults.length > 0
  const hasRecommendation = recommendation && recommendation.best_pick

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-gray-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
          <LeafIcon />
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              ShopSage
            </h1>
            <p className="text-gray-400 text-xs leading-none">
              Smart Product Recommendations
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Location Banner */}
        <LocationBanner location={location} locationLoading={locationLoading} />

        {/* Search Form */}
        <SearchForm onSearch={handleSearch} loading={loading.search} />

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-start gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0v-4.5zm-.75 7a1 1 0 110-2 1 1 0 010 2z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Loading States */}
        {loading.search && <LoadingSpinner variant="search" />}
        {loading.recommend && <LoadingSpinner variant="recommend" />}

        {/* Recommendation Section */}
        {hasRecommendation && (
          <div className="space-y-3">
            <BestPickCard
              bestPick={recommendation.best_pick}
              reasoning={recommendation.reasoning}
            />
            {recommendation.ranked_list && recommendation.ranked_list.length > 0 && (
              <RecommendationPanel rankedList={recommendation.ranked_list} />
            )}
          </div>
        )}

        {/* Product Grid */}
        {hasResults && !loading.search && (
          <ProductGrid
            products={searchResults}
            bestPickTitle={recommendation?.best_pick?.title || null}
          />
        )}

        {/* Empty state after search with no results */}
        {!isLoading &&
          searchResults &&
          searchResults.length === 0 &&
          lastFormData && (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-700">No products found</h3>
              <p className="text-gray-500 mt-1 text-sm">
                Try a different search term or adjust your filters.
              </p>
            </div>
          )}

        {/* Welcome state */}
        {!isLoading && !searchResults && !error && (
          <div className="text-center py-16 space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-sage-50 border-2 border-sage-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-sage-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-700">
                Find the perfect product
              </h2>
              <p className="text-gray-500 mt-1 text-sm max-w-md mx-auto">
                Search across Amazon, Flipkart, Myntra, and Nykaa. ShopSage AI
                will analyze the results and recommend the best pick for you.
              </p>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gray-900 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-gray-500 text-xs">
          ShopSage &copy; {new Date().getFullYear()} &mdash; Powered by AI. Prices may vary.
        </div>
      </footer>
    </div>
  )
}
