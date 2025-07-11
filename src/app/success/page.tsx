import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Home, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <Card className="p-8">
            <CardHeader>

              <div className="flex justify-center mb-6">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                Order Successful!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600 text-lg">
                Thank you for your purchase! Your order has been placed successfully and you will receive a confirmation email shortly.
              </p>

              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>What&apos;s next?</strong><br />
                  • You&apos;ll receive an order confirmation email<br />
                  • We&apos;ll notify you when your order ships<br />
                  • Track your order status anytime
                </p>
              </div>

              <div className="flex flex-col space-y-3">
                <Link href="/" className="w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Home className="h-4 w-4 mr-2" />
                    Continue Shopping
                  </Button>
                </Link>
                <Link href="/admin/orders" className="w-full">
                  <Button variant="outline" className="w-full">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    View Order Status (Admin)
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
