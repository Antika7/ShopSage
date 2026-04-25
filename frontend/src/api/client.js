const API_BASE = '/api'

async function handleResponse(res) {
  if (!res.ok) {
    let message = `Request failed with status ${res.status}`
    try {
      const data = await res.json()
      if (data.detail) {
        message = Array.isArray(data.detail)
          ? data.detail.map((e) => e.msg || JSON.stringify(e)).join(', ')
          : String(data.detail)
      }
    } catch {
      // ignore JSON parse errors on error responses
    }
    throw new Error(message)
  }
  return res.json()
}

export async function fetchLocation() {
  const res = await fetch(`${API_BASE}/location`)
  return handleResponse(res)
}

export async function searchProducts({ productName, maxPrice, brandPreference, country }) {
  const body = { product_name: productName }
  if (maxPrice) body.max_price = Number(maxPrice)
  if (brandPreference) body.brand_preference = brandPreference
  if (country) body.country = country

  const res = await fetch(`${API_BASE}/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return handleResponse(res)
}

export async function getRecommendation({
  productName,
  products,
  maxPrice,
  brandPreference,
  userLocation,
}) {
  const body = {
    product_name: productName,
    products,
  }
  if (maxPrice) body.max_price = Number(maxPrice)
  if (brandPreference) body.brand_preference = brandPreference
  if (userLocation) body.user_location = userLocation

  const res = await fetch(`${API_BASE}/recommend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return handleResponse(res)
}
