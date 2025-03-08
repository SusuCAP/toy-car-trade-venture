
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Filter, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mockProducts } from "@/data/mockData";
import ProductCard from "@/components/common/ProductCard";
import Filters from "@/components/common/Filters";
import { Product } from "@/contexts/AppContext";

const ProductsPage = () => {
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    
    // Filter and sort products based on URL parameters
    let filtered = [...mockProducts];
    const filterItems: string[] = [];
    
    // Apply category filter
    const category = searchParams.get("category");
    if (category && category !== "All") {
      filtered = filtered.filter(product => product.category === category);
      filterItems.push(`Category: ${category}`);
    }
    
    // Apply brand filter
    const brand = searchParams.get("brand");
    if (brand && brand !== "All") {
      filtered = filtered.filter(product => product.brand === brand);
      filterItems.push(`Brand: ${brand}`);
    }
    
    // Apply condition filter
    const condition = searchParams.get("condition");
    if (condition && condition !== "All") {
      filtered = filtered.filter(product => product.condition === condition);
      filterItems.push(`Condition: ${condition}`);
    }
    
    // Apply year filter
    const year = searchParams.get("year");
    if (year) {
      filtered = filtered.filter(product => product.year.includes(year));
      filterItems.push(`Year: ${year}`);
    }
    
    // Apply price range filter
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    if (minPrice) {
      filtered = filtered.filter(product => product.price >= parseFloat(minPrice));
      filterItems.push(`Min Price: $${minPrice}`);
    }
    if (maxPrice) {
      filtered = filtered.filter(product => product.price <= parseFloat(maxPrice));
      filterItems.push(`Max Price: $${maxPrice}`);
    }
    
    // Apply sorting
    const sort = searchParams.get("sort");
    if (sort) {
      switch (sort) {
        case "newest":
          // For demo purposes, we'll just reverse the array to simulate newest first
          filtered = [...filtered].reverse();
          filterItems.push("Sort: Newest First");
          break;
        case "price-asc":
          filtered = [...filtered].sort((a, b) => a.price - b.price);
          filterItems.push("Sort: Price Low to High");
          break;
        case "price-desc":
          filtered = [...filtered].sort((a, b) => b.price - a.price);
          filterItems.push("Sort: Price High to Low");
          break;
      }
    }
    
    setFilteredProducts(filtered);
    setActiveFilters(filterItems);
  }, [location.search]);

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Shop Toy Cars</h1>
      
      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-muted-foreground">Active Filters:</span>
            {activeFilters.map((filter, index) => (
              <div 
                key={index} 
                className="bg-muted text-sm py-1 px-3 rounded-full flex items-center"
              >
                {filter}
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <h2 className="text-lg font-medium mb-4">Filters</h2>
          <Filters />
        </div>
        
        {/* Filters - Mobile */}
        <div className="md:hidden mb-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full flex items-center justify-center">
                <Filter className="mr-2 h-4 w-4" /> Filter & Sort
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <Separator className="my-4" />
              <Filters />
            </SheetContent>
          </Sheet>
        </div>
        
        {/* Products Grid */}
        <div className="flex-1">
          <p className="text-muted-foreground mb-6">
            Showing {filteredProducts.length} products
          </p>
          
          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
