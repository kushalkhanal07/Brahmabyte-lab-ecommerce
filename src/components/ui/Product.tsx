"use client"
import { fetchProducts } from '@/service/fetchApi'
import { useQuery } from '@tanstack/react-query'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { Button } from './button'
import { Loader, ShoppingCart, Star } from 'lucide-react'
import { useProduct } from '../../../context/Context'
import Link from 'next/link'


export default function Product() {

  const { productData, setProductData } = useProduct()
  const { data, isError, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: fetchProducts
  })

  if (isLoading) return <div className='flex justify-center items-center h-[30em]'> <Loader className='animate-spin' /> </div>;
  if (isError) return <p>Error fetching users</p>;


  function SaveData(Id: number) {
    const product = data?.find((item) => {
      return item.id == Id
    })

    const index = productData?.findIndex((item: any) => {
      return item?.id === Id
    })
    if (index === -1) {
      setProductData((prevValue: any) => {
        return [...prevValue, { ...product, quantity: 1 }]
      })
    } else {
      productData[index].quantity = productData[index].quantity ? productData[index].quantity + 1 : 1
      setProductData([...productData])
    }

  }


  return (
    <div className='grid grid-cols-4 gap-x-6 gap-y-3 mt-8'>
      {data?.map(({ id, title, price, rating, description, category, image }) => {

        return (<Card key={id}>
          <CardHeader className=''>
            <div className='flex justify-center h-[200px] '>
              <Image src={image} width={200} height={200} alt="products" className='object-contain transition-transform duration-300 hover:scale-105' />
            </div>
            <CardTitle className='leading-relaxed mt-2 line-clamp-1'>{title}</CardTitle>
            <CardDescription >
              <p className='line-clamp-2'>{description}</p>
              <div className='flex justify-between mt-4 font-bold'>
                <span className='text-md'>Rs.{price}</span>
                <span className='flex gap-x-2'> <Star fill='currentcolor' size={20} className=' text-yellow-400 ' /> {rating?.rate}</span>
              </div>
              <p className='inline-block mt-4 bg-[#80808020] px-2 py-1 rounded-sm text-black text-[0.8em] font-semibold'>
                {category}
              </p>
            </CardDescription>

          </CardHeader>
          <CardContent>
            <p>{""}</p>
          </CardContent>
          <CardFooter>
            <div className='flex gap-x-3 flex-1'>
              <Link href={`/product/${id}`} className='flex-6'><Button variant={"outline"} className=' cursor-pointer w-full'>View Details</Button></Link>
              <Button variant={"outline"} className='flex-1 cursor-pointer bg-blue-600 hover:bg-blue-700'
                onClick={() => { SaveData(id) }}
              > <ShoppingCart className='text-white' /> </Button>
            </div>
          </CardFooter>
        </Card>)
      })}
    </div>
  )
}
