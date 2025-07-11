import api from "@/lib/axiosInstance";
import { Product } from "@/lib/products";

export async function fetchProducts(): Promise<Product[]> {
  const response = await api.get("/products")
  return response.data
}

export async function fetchProductsDetails(id: number): Promise<Product> {
  const response = await api.get(`/products/${id}`)
  return response.data
}