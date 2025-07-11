import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './button'
import { LogOut } from 'lucide-react'

export default function AdminHeader({  handleLogout }: { handleLogout: () => void }) {
  return (
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
  )
}
