"use client"
import AdminHeader from '@/components/ui/AdminHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Package, ShoppingCart, User } from 'lucide-react'
import React from 'react'
import { useProduct } from '../../../../context/Context'
import { OrderData } from '@/lib/cart'
import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
  const { order }: any = useProduct()
  return (
    <div>
      <AdminHeader handleLogout={() => { }} />
      <div className="grid grid-cols-4 gap-6 mb-8 pt-30">
        <div className="flex items-center mb-8 col-span-4">
          <Link href="/admin/dashboard" className="mr-4">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>

        </div>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Orders
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">3</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Revenue
            </CardTitle>
            <div className="text-green-600">Rs</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              Rs.{order[0]?.totalAmount?.toFixed(2) || 0}
            </div>
          </CardContent>
        </Card>
      </div>


      <Card>
        <CardHeader>
          <CardTitle>All Orders ({order.length})</CardTitle>
        </CardHeader>
        {order.length > 0 ? <CardContent>
          <div className="space-y-4">
            {order?.reverse()?.map((item: OrderData, idx: number) => (
              <div className="bg-white shadow-sm rounded-lg border pb-2" key={idx}>
                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        {item?.customerName}
                      </div>

                      <div className="flex items-center">
                        <Package className="h-4 w-4 mr-2" />
                        {item?.products?.length} items
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        ${item?.totalAmount?.toFixed(2)}
                      </div>
                    </div>

                  </div>
                </div>
                {
                  item?.products?.map(({ id, image, title, category, price }) => {
                    return (
                      <div key={id} className='flex border mx-3 items-center flex-1 px-8'>
                        <div className=' flex gap-x-5 items-center mx-5 my-3 flex-1'>
                          <div className='h-30 flex justify-center items-center object-contain  py-5'>
                            <Image src={image} width={50} height={60} alt="items" className="object-contain h-full w-auto" />
                          </div>
                          <ul>
                            <li className='font-bold text-sm text-black'>{title}</li>
                            <li className='text-sm'>{category}</li>
                            <li className='text-green-600 font-bold'>Rs.{price}</li>
                          </ul>
                        </div>

                      </div>
                    )
                  })
                }
              </div>
            ))}
          </div>

        </CardContent> : <p className='text-center text-gray-600'>No order found. Go and order the products to be shown.</p>}
      </Card>
    </div>

  )
}
