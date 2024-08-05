"use client"

import { fetchProductData } from "../services/productService"
import { Button } from "./ui/button"
import { useState, useEffect } from "react"

interface Product {
  name: string
  glbFile: string
  variants: Record<string, string>
}

const ProductView = () => {
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)

  useEffect(() => {
    async function getProductData() {
      const data = await fetchProductData()
      setProduct(data)

      const defaultColor = Object.keys(data.variants)[0]
      setSelectedColor(defaultColor)

      const modelViewer = document.querySelector(
        "model-viewer#model_1_lazy-load"
      ) as any
      if (modelViewer) {
        modelViewer.variantName = defaultColor
      }
    }
    getProductData()
  }, [])

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
    const modelViewer = document.querySelector(
      "model-viewer#model_1_lazy-load"
    ) as any
    if (modelViewer) {
      modelViewer.variantName = color
    }
  }

  if (!product || !selectedColor) return <div>Loading...</div>

  return (
    <>
      <header className="flex items-center justify-between bg-gray-100 px-4 py-3 dark:bg-gray-800">
        <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 rounded-full">
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m12 19-7-7 7-7"></path>
            <path d="M19 12H5"></path>
          </svg>
          <span className="sr-only">Voltar</span>
        </button>
      </header>
      <div className="container mx-auto p-4 h-screen">
        <div className="flex justify-between items-start">
          <div className="w-3/5">
            {selectedColor && (
              <model-viewer
                id="model_1_lazy-load"
                style={{
                  height: "400px",
                  width: "100%",
                  backgroundColor: "#1c2b33",
                }}
                min-field-of-view="30deg"
                max-field-of-view="30deg"
                touch-action="pan-y"
                src={product.glbFile}
                alt="Modelo 3D"
                camera-controls
                camera-target="0 0 0"
                ar
                ar-modes="webxr scene-viewer quick-look"
                ar-scale="fixed"
                reveal="auto"
                ar-status="not-presenting"
              ></model-viewer>
            )}
          </div>
          <div className="w-2/5 pl-8">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-lg mt-2">Cores</p>
            <div className="flex space-x-4 mt-4">
              {Object.entries(product.variants).map(
                ([colorName, colorValue]) => (
                  <Button
                    key={colorName}
                    data-color={colorValue}
                    className={`w-16 h-16 rounded ${
                      colorName === selectedColor
                        ? "border-2 border-[#9dc0fa]"
                        : ""
                    }`}
                    style={{ backgroundColor: colorValue }}
                    onClick={() => handleColorChange(colorName)}
                  ></Button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductView
