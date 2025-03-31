import { Product } from "../types/Product"
interface LengthData {
  id?: string
  sections?: number
  radiator_length?: number
  price?: number
}

type RecordData<T> = Record<string, T>

interface HeightData {
  label?: string
  lengths?: RecordData<LengthData>
}

interface DepthData {
  depth?: number
  heights?: RecordData<HeightData>
}

interface FamilyData {
  id?: string
  depths?: RecordData<DepthData>
}

type ProductData = RecordData<FamilyData>

const transformLengthToProduct = (
  length: LengthData,
  familyId: string,
  depthMM: number,
  label: string
): Product | null => {
  if (!length.sections || !length.radiator_length || !length.price) return null

  return {
    id: length.id ?? `${familyId}-${depthMM}-${length.sections}`,
    label,
    name: `${label}, ${length.sections} sections`,
    length: length.radiator_length,
    price: length.price,
    sections: length.sections,
    family: familyId,
    image: `/images/emmeline-i-465mm_${length.sections}-sections-preview.jpg`,
  }
}

const extractProductsFromFamily = (family: FamilyData): Product[] => {
  const familyId = family.id ?? "Unknown"
  const depths = family.depths ?? {}

  return Object.values(depths).flatMap((depth) =>
    extractProductsFromDepth(depth, familyId)
  )
}

const extractProductsFromDepth = (
  depth: DepthData,
  familyId: string
): Product[] => {
  const depthMM = depth.depth ?? 0
  const heights = depth.heights ?? {}

  return Object.values(heights).flatMap((height) =>
    extractProductsFromHeight(height, familyId, depthMM)
  )
}

const extractProductsFromHeight = (
  height: HeightData,
  familyId: string,
  depthMM: number
): Product[] => {
  const label = height.label ?? ""
  const lengths = height.lengths ?? {}

  return Object.values(lengths)
    .map((length) => transformLengthToProduct(length, familyId, depthMM, label))
    .filter((product) => product !== null)
}

const flattenProductData = (data: ProductData): Product[] => {
  const families = Object.values(data)
  const allProducts = families.flatMap(extractProductsFromFamily)

  return allProducts
}

export default flattenProductData
