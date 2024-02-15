export interface ProductPropsRating {
  rate: number
  count: number
}
export interface Product {
  length: number
  id: number
  title: string
  price: number
  image: string
  description: string
  category: string
  featured: boolean
  rating: ProductPropsRating
}
