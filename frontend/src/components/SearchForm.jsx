import { useState } from 'react'

const INITIAL_FORM = { productName: '', maxPrice: '', brandPreference: '' }

export default function SearchForm({ onSearch, loading }) {
  const [formData, setFormData] = useState(INITIAL_FORM)

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!formData.productName.trim()) return
    onSearch({ ...formData })
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        What are you looking for?
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label
            htmlFor="productName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            id="productName"
            type="text"
            name="productName"
            required
            value={formData.productName}
            onChange={handleChange}
            placeholder="e.g. hairdryer, boAt earphones"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition"
          />
        </div>

        {/* Optional fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="maxPrice"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Max Price (₹){' '}
              <span className="text-gray-400 font-normal text-xs">optional</span>
            </label>
            <input
              id="maxPrice"
              type="number"
              name="maxPrice"
              min="1"
              value={formData.maxPrice}
              onChange={handleChange}
              placeholder="e.g. 2000"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition"
            />
          </div>
          <div>
            <label
              htmlFor="brandPreference"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Brand Preference{' '}
              <span className="text-gray-400 font-normal text-xs">optional</span>
            </label>
            <input
              id="brandPreference"
              type="text"
              name="brandPreference"
              value={formData.brandPreference}
              onChange={handleChange}
              placeholder="e.g. Philips, Sony"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-1">
          <button
            type="submit"
            disabled={loading || !formData.productName.trim()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-sage-500 hover:bg-sage-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold px-8 py-2.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
          >
            {loading ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
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
                Searching...
              </>
            ) : (
              <>
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
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z"
                  />
                </svg>
                Search
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
