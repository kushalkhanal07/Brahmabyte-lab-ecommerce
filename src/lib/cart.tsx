import { Product } from "./products";

export interface OrderData {
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  totalAmount: number;
  products: Product[];
}