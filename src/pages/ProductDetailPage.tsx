
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, Truck, Shield, Calendar, Star, CarFront, BarChart3, Sparkles, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { mockProducts } from "@/data/mockData";
import { useApp } from "@/contexts/AppContext";
import ProductCard from "@/components/common/ProductCard";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, favorites, toggleFavorite } = useApp();
  
  const product = mockProducts.find((p) => p.id === id);
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  // Related products (just random ones for demo)
  const relatedProducts = mockProducts
    .filter((p) => p.category === product?.category && p.id !== id)
    .slice(0, 4);
  
  if (!product) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate("/products")}>
          Return to Shop
        </Button>
      </div>
    );
  }
  
  const isFavorite = favorites.includes(product.id);
  
  const incrementQuantity = () => setQuantity(q => q + 1);
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
    }
  };

  return (
    <div className="container py-8">
      {/* Breadcrumb (simplified) */}
      <div className="mb-8 text-sm text-muted-foreground">
        Home / Shop / {product.category} / {product.name}
      </div>
      
      {/* Product main section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Product Images */}
        <div>
          <div className="aspect-square mb-4 overflow-hidden rounded-lg border bg-muted">
            <img 
              src={product.images[selectedImageIndex]} 
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          
          <div className="flex space-x-2">
            {product.images.map((image, index) => (
              <button 
                key={index}
                className={`h-24 w-24 overflow-hidden rounded-md border ${
                  selectedImageIndex === index ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedImageIndex(index)}
              >
                <img 
                  src={image} 
                  alt={`${product.name} - view ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          <Badge className="mb-3">{product.condition}</Badge>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          
          <div className="flex items-center mt-2 mb-4">
            <div className="flex text-toycar-accent">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground ml-2">24 reviews</span>
          </div>
          
          <p className="text-2xl font-bold text-toycar-primary mb-4">
            ${product.price.toFixed(2)}
          </p>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="icon"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button 
                variant="outline" 
                size="icon"
                onClick={incrementQuantity}
              >
                +
              </Button>
            </div>
            
            <Button 
              className="flex-1"
              onClick={() => addToCart(product, quantity)}
            >
              Add to Cart
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className={isFavorite ? 'text-toycar-secondary' : ''}
              onClick={() => toggleFavorite(product.id)}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
          </div>
          
          <Separator className="my-6" />
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <CarFront className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">Brand: {product.brand}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">Year: {product.year}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">Condition: {product.condition}</span>
            </div>
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">Category: {product.category}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Truck className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Fast Shipping</p>
                <p className="text-sm text-muted-foreground">
                  Delivery estimated within 3-5 business days
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Buyer Protection</p>
                <p className="text-sm text-muted-foreground">
                  Full refund if the item is not as described
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Tabs */}
      <Tabs defaultValue="description" className="mb-16">
        <TabsList className="mb-6">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="returns">Returns</TabsTrigger>
        </TabsList>
        
        <TabsContent value="description" className="text-muted-foreground">
          <h3 className="text-xl font-medium text-foreground mb-4">Product Description</h3>
          <p className="mb-4">{product.description}</p>
          <p>This collectible toy car comes from {product.sellerName} located in {product.location}. Perfect for display or play, depending on the condition.</p>
        </TabsContent>
        
        <TabsContent value="details">
          <h3 className="text-xl font-medium mb-4">Product Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">Specifications</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Brand:</span>
                    <span>{product.brand}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Year:</span>
                    <span>{product.year}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Condition:</span>
                    <span>{product.condition}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span>{product.category}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">Seller Information</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Seller Name:</span>
                    <span>{product.sellerName}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span>{product.location}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Seller Rating:</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 text-toycar-accent fill-current" />
                      ))}
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="shipping" className="text-muted-foreground">
          <h3 className="text-xl font-medium text-foreground mb-4">Shipping Information</h3>
          <p className="mb-4">All orders are processed within 1-2 business days. Shipping time is typically 3-5 business days depending on location.</p>
          <p className="mb-4">We take special care in packaging collectible toy cars to ensure they arrive in the same condition they were sent. Each item is individually wrapped and secured with appropriate padding.</p>
          <p>For international shipping, please note that customs fees may apply depending on your country's import regulations.</p>
        </TabsContent>
        
        <TabsContent value="returns" className="text-muted-foreground">
          <h3 className="text-xl font-medium text-foreground mb-4">Return Policy</h3>
          <p className="mb-4">We offer a 30-day return policy for items that arrive damaged or are significantly different from their description.</p>
          <div className="flex items-start space-x-3 mb-4">
            <AlertTriangle className="h-5 w-5 text-toycar-secondary mt-0.5" />
            <p>Please note that due to the collectible nature of many of our items, we require photo documentation of any damage before approving returns.</p>
          </div>
          <p>Return shipping costs are the responsibility of the buyer unless the return is due to our error.</p>
        </TabsContent>
      </Tabs>
      
      {/* Related Products */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="product-grid">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
