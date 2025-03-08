
import { Link } from "react-router-dom";
import { ChevronRight, Star, TrendingUp, Trophy, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ProductCard from "@/components/common/ProductCard";
import { mockProducts } from "@/data/mockData";

const FeaturedProducts = mockProducts.slice(0, 4);
const NewArrivals = mockProducts.slice(4, 8);

const Index = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-toycar-primary text-white">
        <div className="container py-16 md:py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">Find Your Perfect Toy Car Collection</h1>
            <p className="text-lg md:text-xl opacity-90">Explore thousands of vintage and modern toy cars. Buy, sell, and trade with fellow collectors.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg" className="bg-toycar-secondary hover:bg-toycar-secondary/90">
                <Link to="/products">Shop Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img 
              src="https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800&h=600&q=80" 
              alt="Featured Toy Car" 
              className="rounded-lg shadow-lg max-w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Browse By Category</h2>
            <p className="text-muted-foreground text-center max-w-2xl">
              Discover our extensive collection of toy cars across various categories
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <Link to="/products?category=Vintage" className="group">
              <Card className="overflow-hidden h-full transition-transform group-hover:shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1597334948770-0a5a5a5fb6c4?w=400&h=300&q=80" 
                  alt="Vintage Cars" 
                  className="h-40 w-full object-cover transition-transform group-hover:scale-105"
                />
                <CardContent className="p-4 text-center">
                  <h3 className="font-medium">Vintage</h3>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/products?category=Sports Cars" className="group">
              <Card className="overflow-hidden h-full transition-transform group-hover:shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1508896694512-1eade558679c?w=400&h=300&q=80" 
                  alt="Sports Cars" 
                  className="h-40 w-full object-cover transition-transform group-hover:scale-105"
                />
                <CardContent className="p-4 text-center">
                  <h3 className="font-medium">Sports Cars</h3>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/products?category=JDM" className="group">
              <Card className="overflow-hidden h-full transition-transform group-hover:shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1541038019982-5b88a3d15a74?w=400&h=300&q=80" 
                  alt="JDM Cars" 
                  className="h-40 w-full object-cover transition-transform group-hover:scale-105"
                />
                <CardContent className="p-4 text-center">
                  <h3 className="font-medium">JDM</h3>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/products?category=Muscle Cars" className="group">
              <Card className="overflow-hidden h-full transition-transform group-hover:shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1573074617613-fc8ef27eaa2f?w=400&h=300&q=80" 
                  alt="Muscle Cars" 
                  className="h-40 w-full object-cover transition-transform group-hover:scale-105"
                />
                <CardContent className="p-4 text-center">
                  <h3 className="font-medium">Muscle Cars</h3>
                </CardContent>
              </Card>
            </Link>
          </div>
          
          <div className="flex justify-center mt-8">
            <Button asChild variant="outline">
              <Link to="/categories" className="flex items-center">
                View All Categories <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground text-center max-w-2xl">
              Hand-picked collector's items and popular toy cars for enthusiasts of all ages
            </p>
          </div>
          
          <div className="product-grid">
            {FeaturedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            <Button asChild>
              <Link to="/products" className="flex items-center">
                View All Products <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* New Arrivals with Carousel */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl font-bold mb-4">New Arrivals</h2>
            <p className="text-muted-foreground text-center max-w-2xl">
              The latest additions to our growing toy car collection
            </p>
          </div>
          
          <Carousel className="w-full">
            <CarouselContent>
              {NewArrivals.map((product) => (
                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <ProductCard product={product} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="flex flex-col items-center text-center p-6">
              <Trophy className="h-12 w-12 text-toycar-primary mb-4" />
              <h3 className="text-xl font-medium mb-2">Authentic Collection</h3>
              <p className="text-muted-foreground">
                Every toy car in our collection is verified for authenticity and quality.
              </p>
            </Card>
            
            <Card className="flex flex-col items-center text-center p-6">
              <Truck className="h-12 w-12 text-toycar-primary mb-4" />
              <h3 className="text-xl font-medium mb-2">Secure Shipping</h3>
              <p className="text-muted-foreground">
                Special packaging ensures your collectibles arrive safely and in pristine condition.
              </p>
            </Card>
            
            <Card className="flex flex-col items-center text-center p-6">
              <TrendingUp className="h-12 w-12 text-toycar-primary mb-4" />
              <h3 className="text-xl font-medium mb-2">Trading Community</h3>
              <p className="text-muted-foreground">
                Join thousands of collectors to buy, sell, and trade your toy cars.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Collectors Say</h2>
            <p className="text-muted-foreground text-center max-w-2xl">
              Hear from our community of toy car enthusiasts and collectors
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="flex text-toycar-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="italic mb-4">
                "I've been collecting Hot Wheels for 20 years, and this is by far the best marketplace I've found. The condition ratings are accurate and the shipping is fast."
              </p>
              <p className="font-medium">- Michael T.</p>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="flex text-toycar-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="italic mb-4">
                "Found a rare 1970s Matchbox that I've been searching for years! The seller was great and the item arrived exactly as described. Will definitely be back."
              </p>
              <p className="font-medium">- Sarah L.</p>
            </Card>
            
            <Card className="p-6 md:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-4">
                <div className="flex text-toycar-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="italic mb-4">
                "As a parent, I love that I can find affordable collectible cars for my kids without breaking the bank. The filtering options make it easy to find exactly what we're looking for."
              </p>
              <p className="font-medium">- David R.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-toycar-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Collection?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of collectors and start trading today!
          </p>
          <Button asChild size="lg" className="bg-white text-toycar-primary hover:bg-white/90">
            <Link to="/products">Shop Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
