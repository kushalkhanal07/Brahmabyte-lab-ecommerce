"use client"
import Link from 'next/link'
import {ShoppingCart} from 'lucide-react'
import { Button } from './button'
import { useEffect } from 'react'
import Image from 'next/image'
import { useProduct } from '../../../context/Context'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const { productData, count, setCount }: any = useProduct()
  const Data = productData?.map((items: any) => {
    return items.quantity
  })
  const sum = Data.length ? Data?.reduce((acc: number, current: number) => {
    return acc + current
  }) : ""

  useEffect(() => {
    setCount(sum)

  }, [sum, setCount])

  if (pathname === '/auth/login' || pathname === 'auth/register' || pathname === '/admin/dashboard' || pathname === '/admin/products' || pathname === '/admin/orders') {
    return null;
  }
  return (
    <div className=" bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-[1450px] mx-auto">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              <Image src="/ecommerce.png" width={90} height={30} alt="eccommerce" />
            </Link>
            <div className='flex gap-x-4'>
              <Link href="/cart">
                <Button variant={'outline'} className=' relative cursor-pointer' >  <span className='relative'><ShoppingCart />
                </span> Cart <p className=' w-6 h-6 text-white flex justify-center rounded-[50%] items-center bg-blue-600 absolute -right-3 -top-3 text-[0.8em] '>{count ? count : 0}</p> </Button>
              </Link>
              <Link href="/admin/dashboard">
                <Button className="cursor-pointer" variant={'outline'}>Admin</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>


    </div>
  )
}
