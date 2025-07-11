"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {  DollarSign, Eye, Loader, LogOut, Package, ShoppingCart, Users } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '@/service/fetchApi'
import { useRouter } from 'next/navigation';
import Image from 'next/image'

export default function Admin() {
  const router = useRouter();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: fetchProducts
  })

  if (isLoading) return <div className='flex justify-center items-center h-screen'> <Loader className='animate-spin' /> </div>;
  if (isError) return <p>Error fetching users</p>;

  function handleLogout() {
    document.cookie = `authToken=${JSON.stringify(data)}; path=/; max-age=${0}`;
    router.push("/")
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white fixed right-0 left-0 px-8 shadow-sm border-b">
        <div className=" max-w-[1450px] mx-auto ">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
                <Image src="/ecommerce.png" width={90} height={50} alt="ecommerce" />
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  View Store
                </Button>
              </Link>
              <Button className='cursor-pointer' variant="outline" size="sm" onClick={() => handleLogout()} >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 pt-30">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here&apos;s what&apos;s happening with your store.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Products
              </CardTitle>
              <Package className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{data?.length}</div>
              <p className="text-xs text-gray-500 mt-1">
                Active products in store
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Orders
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">4</div>
              <p className="text-xs text-gray-500 mt-1">
                2 pending, 1 completed
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                Rs.100
              </div>
              <p className="text-xs text-gray-500 mt-1">
                From 6 orders
              </p>
            </CardContent>
          </Card>


        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="h-5 w-5 mr-2 text-blue-600" />
                Manage Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                View and manage your product catalog
              </p>
              <Link href="/admin/products">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer">
                  <Eye className="h-4 w-4 mr-2" />
                  View Products
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2 text-green-600" />
                Order Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Track and manage customer orders
              </p>
              <Link href="/admin/orders">
                <Button className="w-full bg-green-600 hover:bg-green-700 cursor-pointer">
                  <Eye className="h-4 w-4 mr-2" />
                  View Orders
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-purple-600" />
                Store Front
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Visit your customer-facing store
              </p>
              <Link href="/">
                <Button variant="outline" className="w-full cursor-pointer">
                  <Eye className="h-4 w-4 mr-2" />
                  View Store
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
