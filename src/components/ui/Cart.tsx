"use client"
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader } from './card'
import { useProduct } from '../../../context/Context'
import Image from 'next/image'
import { Product } from '@/lib/products'
import { Button } from './button'
import { Trash } from 'lucide-react'
import { Separator } from './separator'
import { Label } from './label'
import { Input } from './input'
import { useRouter } from "next/navigation"
import { toast } from 'sonner'
import z from 'zod'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const checkoutSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  address: z.string().min(10, 'Please enter a complete address'),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function Cart() {
  const router = useRouter();
  const { count, productData, setProductData, setAddOrder, total, show, setShow } = useProduct()
  console.log(productData)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutFormData) => {

    setShow(true)
    await new Promise(resolve => setTimeout(resolve, 1000));

    setAddOrder((prevValue: any) => {
      return [...prevValue, {
        customerName: data.name,
        customerEmail: data.email,
        customerAddress: data.address,
        totalAmount: total,
        products: productData.map((item: Product) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          category: item.category,
        }))
      }]
    });

    setShow(false)
    reset()

    toast("Order has been place successfully", {
      description: "Sunday, December 03, 2023 at 9:00 AM",
      action: {
        label: "Close",
        onClick: () => console.log("Undo"),
      },
    })

    router.push("/success");

  };

  function handleDelete(id: number) {
    const filterData = productData?.filter((item: Product) => {
      return item.id != id
    })
    setProductData(filterData)
  }

  function handleDecrease(id: number) {
    const index = productData.findIndex((item: any) => {
      return item.id === id
    })

    if (productData[index].quantity == 1) {
      productData[index].quantity = 0
      const finalProduct = productData.filter((item: any) => {
        return item.id !== id
      })
      setProductData(finalProduct)
    } else {
      productData[index]?.quantity ? productData[index].quantity -= 1 : null
      setProductData([...productData])
    }




  }

  function handleIncrease(id: number) {
    const incrementQuantity = productData.map((item: any) => {
      return item.id === id ? { ...item, quantity: item?.quantity + 1 } : item
    })
    setProductData(incrementQuantity)
  }





  return (
    <main className="grid grid-cols-5 gap-x-4  mt-10">
      <Card className="col-span-3 font-bold text-xl">
        {
          count > 0 ? (
            <>
              <CardHeader>
                Shopping Cart ({count} items)
              </CardHeader>
              <CardDescription>
                {productData.map(({ id, image, category, title, price, quantity }: Product) => {
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
                      <div className='flex items-center'>
                        <Button variant={"outline"}
                          onClick={() => handleDecrease(id)}
                        >-</Button>
                        <span className='mx-5'>{quantity}</span>
                        <Button variant={"outline"}
                          onClick={() => handleIncrease(id)}
                        >+</Button>
                        <ul className='flex flex-col gap-y-2 ml-4 items-center'>
                          <li>Rs.{((quantity ?? 1) * price).toFixed(2)}</li>
                          <li className='cursor-pointer' onClick={() => handleDelete(id)}> <Trash color='red' /> </li>
                        </ul>
                      </div>
                    </div>
                  )
                })}

              </CardDescription>
            </>
          ) : <p className='text-center text-gray-600 text-lg  my-auto'>No cart available. Add to your Cart</p>
        }
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          CheckOut
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="Name"
                className="mt-2"
              />
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="email@example.com"
                className="mt-2"
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                {...register('address')}
                placeholder="Address"
                className="mt-2"
              />
              {errors.address && (
                <p className="text-sm text-red-600 mt-1">{errors.address.message}</p>
              )}
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
            // disabled={isCheckingOut}
            >
              {show ? 'Processing...' : `Place Order - Rs.${total.toFixed(2)}`}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
