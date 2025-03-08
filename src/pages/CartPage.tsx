
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Trash2, 
  ChevronLeft, 
  Minus, 
  Plus,
  CreditCard
} from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";

const CartPage = () => {
  const { cart, updateCartItemQuantity, removeFromCart, placeOrder } = useApp();
  const [shippingAddress, setShippingAddress] = useState("");
  
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = cart.length > 0 ? 5.99 : 0;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;
  
  const handleCheckout = () => {
    if (!shippingAddress.trim()) {
      alert("Please enter a shipping address");
      return;
    }
    
    placeOrder(shippingAddress);
  };
  
  return (
    <div className="container py-8">
      <div className="flex items-center mb-6">
        <Button asChild variant="outline" size="sm" className="mr-4">
          <Link to="/products">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Continue Shopping
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Your Cart</h1>
      </div>
      
      {cart.length === 0 ? (
        <Card className="text-center p-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-medium">Your cart is empty</h2>
            <p className="text-muted-foreground">
              Looks like you haven't added any toy cars to your cart yet.
            </p>
            <Button asChild size="lg" className="mt-4">
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Cart Items ({cart.reduce((sum, item) => sum + item.quantity, 0)})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex flex-col sm:flex-row gap-4 py-4">
                    <div className="w-full sm:w-32 h-32 rounded-md overflow-hidden">
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start">
                        <Link to={`/product/${item.product.id}`} className="font-medium text-lg hover:text-primary transition-colors">
                          {item.product.name}
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.product.brand} • {item.product.condition}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center border rounded-md">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-none" 
                            onClick={() => updateCartItemQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-none" 
                            onClick={() => updateCartItemQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="font-medium">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button className="w-full" disabled={cart.length === 0}>
                      Checkout
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Complete your order</SheetTitle>
                      <SheetDescription>
                        Enter your shipping information to place your order.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="py-4 space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-medium">Total: ${total.toFixed(2)}</h3>
                        <p className="text-sm text-muted-foreground">
                          {cart.reduce((sum, item) => sum + item.quantity, 0)} items
                        </p>
                      </div>
                      <Separator />
                      <div className="space-y-4 pt-2">
                        <div className="space-y-2">
                          <label htmlFor="shipping-address" className="text-sm font-medium">
                            Shipping Address
                          </label>
                          <Textarea
                            id="shipping-address"
                            placeholder="Enter your full address"
                            value={shippingAddress}
                            onChange={(e) => setShippingAddress(e.target.value)}
                            className="min-h-24"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="card-number" className="text-sm font-medium">
                            Card Number
                          </label>
                          <div className="flex">
                            <Input 
                              id="card-number" 
                              placeholder="4242 4242 4242 4242"
                              className="flex-1"
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            This is a demo - no real payment will be processed
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="expiry" className="text-sm font-medium">
                              Expiry Date
                            </label>
                            <Input id="expiry" placeholder="MM/YY" />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="cvc" className="text-sm font-medium">
                              CVC
                            </label>
                            <Input id="cvc" placeholder="123" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <SheetFooter>
                      <Button 
                        className="w-full" 
                        onClick={handleCheckout}
                        disabled={!shippingAddress.trim()}
                      >
                        <CreditCard className="mr-2 h-4 w-4" />
                        Place Order
                      </Button>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
