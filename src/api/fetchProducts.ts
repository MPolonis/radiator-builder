import { Product } from "../types/Product"

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch("/radiator_builder_data.json")
  if (!response.ok) throw new Error("Failed to fetch product data")
  const data = await response.json()

  const result: Product[] = []

  Object.values(data).forEach((family: any) => {
    const familyId = family.id ?? "Unknown"

    const depths = family.depths ?? {}

    const description = family.description ?? ""

    Object.values(depths).forEach((depth: any) => {
      const depthMM = depth.depth ?? 0
      Object.values(depth.heights ?? {}).forEach((height: any) => {
        Object.values(height.lengths ?? {}).forEach((length: any) => {
          if (!length.sections || !length.radiator_length || !length.price)
            return
          result.push({
            id: length.id ?? `${familyId}-${depthMM}-${length.sections}`,
            name: `${familyId} | ${depthMM}mm, ${length.sections} sections`,
            description: description,
            length: length.radiator_length,
            price: length.price,
            sections: length.sections,
            family: familyId,
            image: "/placeholder.png",
          })
        })
      })
    })
  })

  return result
}

export default fetchProducts
