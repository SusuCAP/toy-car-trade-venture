
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

// Types
export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  condition: "new" | "like new" | "good" | "fair" | "poor";
  brand: string;
  category: string;
  year: string;
  description: string;
  images: string[];
  sellerId: string;
  sellerName: string;
  location: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Order = {
  id: string;
  items: CartItem[];
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  date: string;
  shippingAddress: string;
  trackingNumber?: string;
};

type AppContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (email: string, password: string) => void;
  logout: () => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  orders: Order[];
  placeOrder: (shippingAddress: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // User state
  const [user, setUser] = useState<User | null>(null);
  
  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Favorites state
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Orders state
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Load saved state from localStorage
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) setUser(JSON.parse(savedUser));
      
      const savedCart = localStorage.getItem("cart");
      if (savedCart) setCart(JSON.parse(savedCart));
      
      const savedFavorites = localStorage.getItem("favorites");
      if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
      
      const savedOrders = localStorage.getItem("orders");
      if (savedOrders) setOrders(JSON.parse(savedOrders));
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    }
  }, []);
  
  // Save state to localStorage when changed
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);
  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);
  
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);
  
  // Auth functions
  const login = (email: string, password: string) => {
    // Simulated login (in reality would be an API call)
    // Just for demo purposes we hardcode a user
    if (email && password.length >= 6) {
      const newUser = {
        id: "user1",
        name: email.split('@')[0],
        email,
        avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`,
      };
      setUser(newUser);
      toast.success("Logged in successfully!");
    } else {
      toast.error("Invalid credentials. Try any email and password (min 6 chars).");
    }
  };
  
  const logout = () => {
    setUser(null);
    toast.success("Logged out successfully!");
  };
  
  // Cart functions
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item => 
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { product, quantity }];
      }
    });
    
    toast.success(`${product.name} added to cart!`);
  };
  
  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    toast.success("Item removed from cart");
  };
  
  const updateCartItemQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };
  
  const clearCart = () => {
    setCart([]);
  };
  
  // Favorites functions
  const toggleFavorite = (productId: string) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(productId)) {
        toast.success("Removed from favorites");
        return prevFavorites.filter(id => id !== productId);
      } else {
        toast.success("Added to favorites");
        return [...prevFavorites, productId];
      }
    });
  };
  
  // Order functions
  const placeOrder = (shippingAddress: string) => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      items: [...cart],
      status: "pending",
      total,
      date: new Date().toISOString(),
      shippingAddress,
      trackingNumber: `TR-${Math.floor(100000 + Math.random() * 900000)}`
    };
    
    setOrders(prevOrders => [newOrder, ...prevOrders]);
    clearCart();
    
    toast.success("Order placed successfully!");
  };
  
  const value = {
    user,
    setUser,
    login,
    logout,
    cart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    favorites,
    toggleFavorite,
    orders,
    placeOrder,
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  
  return context;
};
