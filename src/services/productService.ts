export async function fetchProductData() {
  const res = await fetch(
    "https://raw.githubusercontent.com/futuriza/desafio-product-data/main/data/product.json"
  )
  if (!res.ok) {
    throw new Error("Failed to fetch product data")
  }
  const data = await res.json()
  return data
}
