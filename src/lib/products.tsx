// types/product.ts
export type ProductRating ={
  rate: number;
  count: number;
}

export type Product ={
  id: number;
  title: string;
  price: number;
  quantity?:number | undefined;
  description: string;
  category: string;
  image: string;
  rating: ProductRating;
}
