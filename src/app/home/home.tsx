import Product from '@/components/ui/Product'
import React from 'react'

export default function Homes() {
  return (
    <main>
      <div className='flex justify-center flex-col text mt-10'>
        <p className='text-4xl font-bold text-center'>Welcome to my <span className='text-blue-600'>E-shop</span></p>
        <p className='text-center mt-5 text-xl max-w-[600px] mx-auto text-gray-600'>Discover amazing products at unbeatable prices. Your one-stop shop for everything you need.</p>
      </div>
      <Product/>
    </main>
  )
}
