"use client"
import { OrderData } from "@/lib/cart";
import { AuthData } from "@/lib/login";
import { Product } from "@/lib/products";
import { createContext, useContext, useEffect, useState } from "react";

export interface ListProductData {
  productData: Product[],
  setProductData: React.Dispatch<React.SetStateAction<Product[]>>,
  count: number,
  setCount: React.Dispatch<React.SetStateAction<number>>,
  order: OrderData[],
  setAddOrder: React.Dispatch<React.SetStateAction<OrderData[]>>,
  total: number,
  setTotal: React.Dispatch<React.SetStateAction<number>>,
  show: Boolean,
  setShow: React.Dispatch<React.SetStateAction<Boolean>>,
  login: AuthData | null,
  setAuthenticate: React.Dispatch<React.SetStateAction<AuthData | null>>,

}

const ProductContext = createContext<ListProductData | undefined>(undefined);

export function useProduct() {
  let context = useContext(ProductContext)
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context
}

export default function ProductProvider({ children }: { children: React.ReactNode }) {
  const [productData, setProductData] = useState<Product[]>([])
  const [count, setCount] = useState<number>(0)
  const [order, setAddOrder] = useState<OrderData[]>([])
  const [total, setTotal] = useState<number>(0)
  const [show, setShow] = useState<Boolean>(false)
  const [login, setAuthenticate] = useState<AuthData | null>(null);

  const totalOrder = productData.length ? productData?.map((item) => {
    return item?.price * (item?.quantity ?? 1)
  })?.reduce((acc, current): any => {
    return acc + current
  }) : 0


  useEffect(() => {
    setTotal(totalOrder)
  }, [productData])

  return (
    <>
      <ProductContext.Provider value={{ productData, setProductData, count, setCount, order, setAddOrder, total, setTotal, show, setShow, login, setAuthenticate }}>
        {children}
      </ProductContext.Provider>
    </>
  )
}