
import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Link } from "react-router-dom";
import { ChevronLeft, Package, Truck, CheckCircle, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const statusIcons = {
  pending: <Clock className="h-4 w-4 text-orange-500" />,
  processing: <Package className="h-4 w-4 text-blue-500" />,
  shipped: <Truck className="h-4 w-4 text-purple-500" />,
  delivered: <CheckCircle className="h-4 w-4 text-green-500" />,
  cancelled: <XCircle className="h-4 w-4 text-red-500" />,
};

const statusColors = {
  pending: "bg-orange-100 text-orange-800 hover:bg-orange-200",
  processing: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  shipped: "bg-purple-100 text-purple-800 hover:bg-purple-200",
  delivered: "bg-green-100 text-green-800 hover:bg-green-200",
  cancelled: "bg-red-100 text-red-800 hover:bg-red-200",
};

const OrdersPage = () => {
  const { orders, user } = useApp();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  
  if (!user) {
    return (
      <div className="container py-8">
        <Card className="text-center p-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-medium">Please log in to view your orders</h2>
            <Button asChild size="lg" className="mt-4">
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container py-8">
      <div className="flex items-center mb-6">
        <Button asChild variant="outline" size="sm" className="mr-4">
          <Link to="/">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Your Orders</h1>
      </div>
      
      {orders.length === 0 ? (
        <Card className="text-center p-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-medium">No orders yet</h2>
            <p className="text-muted-foreground">
              You haven't placed any orders yet. Start shopping to add some!
            </p>
            <Button asChild size="lg" className="mt-4">
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg">Order #{order.id.slice(-6)}</CardTitle>
                    <CardDescription>
                      Placed on {new Date(order.date).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <Badge className={statusColors[order.status]}>
                    <div className="flex items-center gap-1">
                      {statusIcons[order.status]}
                      <span className="capitalize">{order.status}</span>
                    </div>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium">Total</p>
                      <p className="text-xl font-bold">${order.total.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Items</p>
                      <p>{order.items.reduce((sum, item) => sum + item.quantity, 0)} items</p>
                    </div>
                    {order.trackingNumber && (
                      <div>
                        <p className="text-sm font-medium">Tracking</p>
                        <p className="font-mono">{order.trackingNumber}</p>
                      </div>
                    )}
                  </div>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value={order.id}>
                      <AccordionTrigger>Order Details</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-2">
                          <div>
                            <h4 className="font-medium mb-2">Shipping Address</h4>
                            <p className="text-sm whitespace-pre-line">{order.shippingAddress}</p>
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <h4 className="font-medium mb-2">Items</h4>
                            <div className="space-y-4">
                              {order.items.map((item) => (
                                <div key={item.product.id} className="flex gap-4">
                                  <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                                    <img 
                                      src={item.product.images[0]} 
                                      alt={item.product.name} 
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <Link to={`/product/${item.product.id}`} className="font-medium hover:text-primary transition-colors">
                                      {item.product.name}
                                    </Link>
                                    <div className="flex justify-between mt-1">
                                      <p className="text-sm text-muted-foreground">
                                        Qty: {item.quantity}
                                      </p>
                                      <p className="font-medium">
                                        ${(item.product.price * item.quantity).toFixed(2)}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
