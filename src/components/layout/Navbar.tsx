
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Car, ShoppingCart, Heart, User, Package, LogOut, Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, logout, cart } = useApp();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
          <Car className="h-6 w-6 text-toycar-primary animate-car-drive" />
          <span className="text-xl font-bold text-toycar-primary">ToyCarTrade</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">
            Shop
          </Link>
          <Link to="/categories" className="text-muted-foreground hover:text-foreground transition-colors">
            Categories
          </Link>
          <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
        </nav>

        {/* Search bar (visible on desktop) */}
        <div className="hidden md:flex w-1/3 mx-4">
          <form className="w-full relative" onSubmit={(e) => { 
            e.preventDefault();
            navigate("/products");
          }}>
            <Input 
              type="search" 
              placeholder="Search toy cars..."
              className="w-full pr-8" 
            />
          </form>
        </div>

        {/* User actions */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-toycar-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Favorites */}
          <Link to="/favorites">
            <Heart className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
          </Link>

          {/* User Menu or Login */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/account")}>
                  <User className="mr-2 h-4 w-4" />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/orders")}>
                  <Package className="mr-2 h-4 w-4" />
                  Orders
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" onClick={() => navigate("/login")}>
              Login
            </Button>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 py-3 pb-5 border-t">
          <div className="mb-3">
            <form className="w-full relative" onSubmit={(e) => { 
              e.preventDefault();
              navigate("/products");
              closeMobileMenu();
            }}>
              <Input 
                type="search" 
                placeholder="Search toy cars..."
                className="w-full pr-8" 
              />
            </form>
          </div>
          <nav className="flex flex-col space-y-3">
            <Link 
              to="/products" 
              className="text-foreground py-2 border-b border-muted"
              onClick={closeMobileMenu}
            >
              Shop
            </Link>
            <Link 
              to="/categories" 
              className="text-foreground py-2 border-b border-muted"
              onClick={closeMobileMenu}
            >
              Categories
            </Link>
            <Link 
              to="/about" 
              className="text-foreground py-2 border-b border-muted"
              onClick={closeMobileMenu}
            >
              About
            </Link>
            <div className="flex justify-between pt-2">
              <Link 
                to="/cart" 
                className="relative flex items-center"
                onClick={closeMobileMenu}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                <span>Cart ({totalItems})</span>
              </Link>
              <Link 
                to="/favorites" 
                className="flex items-center"
                onClick={closeMobileMenu}
              >
                <Heart className="h-5 w-5 mr-2" />
                <span>Favorites</span>
              </Link>
            </div>
            <div className="pt-2">
              {user ? (
                <div className="flex flex-col space-y-2">
                  <Link 
                    to="/account" 
                    className="flex items-center py-2"
                    onClick={closeMobileMenu}
                  >
                    <User className="h-5 w-5 mr-2" />
                    <span>Account</span>
                  </Link>
                  <Link 
                    to="/orders" 
                    className="flex items-center py-2"
                    onClick={closeMobileMenu}
                  >
                    <Package className="h-5 w-5 mr-2" />
                    <span>Orders</span>
                  </Link>
                  <button 
                    className="flex items-center py-2 text-red-500"
                    onClick={() => {
                      logout();
                      closeMobileMenu();
                    }}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    <span>Log out</span>
                  </button>
                </div>
              ) : (
                <Button 
                  className="w-full"
                  onClick={() => {
                    navigate("/login");
                    closeMobileMenu();
                  }}
                >
                  Login
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
