"use client"
import AdminHeader from '@/components/ui/AdminHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { fetchProducts } from '@/service/fetchApi'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Filter, Loader, Package, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Page() {

  const { data, isError, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: fetchProducts
  })

  if (isLoading) return <div className='flex justify-center items-center h-screen'> <Loader className='animate-spin' /> </div>;
  if (isError) return <p>Error fetching users</p>;

  return (
    <div className="min-h-screen">
      <AdminHeader handleLogout={() => { }} />
      <div className="container mx-auto px-4 py-8 pt-30">
        <div className="flex items-center mb-8">
          <Link href="/admin/dashboard" className="mr-4">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Products
              </CardTitle>
              <Package className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{data?.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Categories
              </CardTitle>
              <Filter className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">4</div>
            </CardContent>
          </Card>
        </div>




        <Card>
          <CardHeader>
            <CardTitle>Products ({data?.length})</CardTitle>
          </CardHeader>
          <CardContent>

            <div className="space-y-4">
              {data?.map((product) => (
                <div key={product.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={20}
                    height={20}
                    className="w-16 h-16 object-contain rounded-md bg-gray-50"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                      {product.description}
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      <Button variant="outline">
                        {product.category}
                      </Button>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-500 ml-1">
                          {product.rating?.rate?.toFixed(1) || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      ${product.price.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500">
                      ID: {product.id}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Link href={`/product/${product.id}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
