// types/product.ts
export interface ProductRating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  quantity?:number | undefined;
  description: string;
  category: string;
  image: string;
  rating: ProductRating;
}
