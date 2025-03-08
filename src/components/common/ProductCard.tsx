
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useApp, Product } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, favorites, toggleFavorite } = useApp();

  const isFavorite = favorites.includes(product.id);

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="h-48 w-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </Link>
        <Badge className="absolute top-2 left-2 bg-white text-primary border-primary">
          {product.condition}
        </Badge>
        <Button 
          variant="ghost" 
          size="icon" 
          className={`absolute top-2 right-2 rounded-full bg-white/80 ${
            isFavorite ? 'text-secondary' : 'text-muted-foreground'
          } hover:bg-white`}
          onClick={() => toggleFavorite(product.id)}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
        </Button>
      </div>
      <CardContent className="p-4 flex-1">
        <div className="space-y-1">
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-medium line-clamp-2 hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-lg font-bold text-primary">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {product.brand} • {product.year}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
