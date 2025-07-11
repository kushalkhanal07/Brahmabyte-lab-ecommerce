"use client"
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft,Loader, Star } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { Card, CardContent } from './card';
import { Separator } from './separator';
import { Button } from './button';
import { fetchProductsDetails } from '@/service/fetchApi';
import Image from 'next/image';

export default function Viewdata({ id }: { id: string }) {

  const { data, isError, isLoading } = useQuery({
    queryKey: ["data", id],
    queryFn: () => fetchProductsDetails(Number(id))
  })

  if (isLoading) return <div className='flex justify-center items-center h-[30em]'> <Loader className='animate-spin' /> </div>;
  if (isError) return <p>Error fetching users</p>;
  console.log(data)

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Store
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
          <Card className="overflow-hidden  flex justify-center items-center">
            <CardContent className=" ">
                <Image src={data?.image || ""} width={300} height={0} alt={"items"} className='' />
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <Button variant="outline" className="mb-4">
                  {data?.category}
                </Button>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {data?.title}
                </h1>

                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star

                        key={i}
                        className={`h-5 w-5 ${i < Math.floor(data?.rating?.rate || 0)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                          }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">
                    {data?.rating?.rate?.toFixed(1) || 'N/A'} ({data?.rating?.count || 0} reviews)
                  </span>
                </div>

                <div className="text-4xl font-bold text-green-600 mb-6">
                  ${data?.price.toFixed(2)}
                </div>

                <Separator className="mb-6" />

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {data?.description}
                  </p>
                </div>

                <Separator className="" />                
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
