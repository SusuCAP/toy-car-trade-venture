
import { Product } from "../contexts/AppContext";

export const mockProducts: Product[] = [
  {
    id: "p1",
    name: "Vintage 1967 Hot Wheels Camaro",
    price: 149.99,
    condition: "good",
    brand: "Hot Wheels",
    category: "Vintage",
    year: "1967",
    description: "Original first-generation Hot Wheels Camaro in metallic blue. Shows some play wear but overall in good condition with most of the original paint intact.",
    images: [
      "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?q=80&w=500&h=350&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=500&h=350&auto=format&fit=crop"
    ],
    sellerId: "seller1",
    sellerName: "VintageToyCars",
    location: "Portland, OR"
  },
  {
    id: "p2",
    name: "Matchbox 2018 Bugatti Chiron",
    price: 12.99,
    condition: "like new",
    brand: "Matchbox",
    category: "Sports Cars",
    year: "2018",
    description: "Like-new Matchbox Bugatti Chiron in striking blue. Only displayed in case, never played with.",
    images: [
      "https://images.unsplash.com/photo-1508896694512-1eade558679c?q=80&w=500&h=350&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547245324-d777c6f05e80?q=80&w=500&h=350&auto=format&fit=crop"
    ],
    sellerId: "seller2",
    sellerName: "ModernCollectibles",
    location: "Austin, TX"
  },
  {
    id: "p3",
    name: "Tomica Limited Vintage Nissan Skyline GT-R",
    price: 89.95,
    condition: "new",
    brand: "Tomica",
    category: "JDM",
    year: "2020",
    description: "New in box Tomica Limited Vintage Nissan Skyline GT-R (KPGC10) in silver. Highly detailed 1/64 scale model with opening hood.",
    images: [
      "https://images.unsplash.com/photo-1541038019982-5b88a3d15a74?q=80&w=500&h=350&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543465077-db45d34b88a5?q=80&w=500&h=350&auto=format&fit=crop"
    ],
    sellerId: "seller3",
    sellerName: "JDMToyCollector",
    location: "San Francisco, CA"
  },
  {
    id: "p4",
    name: "Mini GT 1/64 Porsche 911 GT3 RS",
    price: 24.99,
    condition: "like new",
    brand: "Mini GT",
    category: "Sports Cars",
    year: "2021",
    description: "Mini GT Porsche 911 GT3 RS in striking green. Opened for display only, comes with original packaging.",
    images: [
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?q=80&w=500&h=350&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?q=80&w=500&h=350&auto=format&fit=crop"
    ],
    sellerId: "seller4",
    sellerName: "LuxuryDiecast",
    location: "Miami, FL"
  },
  {
    id: "p5",
    name: "1970s Matchbox Superfast Ford Capri",
    price: 45.00,
    condition: "fair",
    brand: "Matchbox",
    category: "Vintage",
    year: "1970s",
    description: "Vintage Matchbox Superfast Ford Capri in red. Shows play wear and some paint chips but overall solid condition for its age.",
    images: [
      "https://images.unsplash.com/photo-1597334948770-0a5a5a5fb6c4?q=80&w=500&h=350&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=500&h=350&auto=format&fit=crop"
    ],
    sellerId: "seller5",
    sellerName: "RetroToyFinder",
    location: "Chicago, IL"
  },
  {
    id: "p6",
    name: "Auto World 1/64 1969 Dodge Charger",
    price: 17.99,
    condition: "new",
    brand: "Auto World",
    category: "Muscle Cars",
    year: "2022",
    description: "Brand new Auto World 1/64 1969 Dodge Charger in glossy black. Highly detailed with authentic proportions and rubber tires.",
    images: [
      "https://images.unsplash.com/photo-1573074617613-fc8ef27eaa2f?q=80&w=500&h=350&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=500&h=350&auto=format&fit=crop"
    ],
    sellerId: "seller6",
    sellerName: "MuscleCarModels",
    location: "Detroit, MI"
  },
  {
    id: "p7",
    name: "Johnny Lightning 1970 Chevy Nova SS",
    price: 15.95,
    condition: "good",
    brand: "Johnny Lightning",
    category: "Muscle Cars",
    year: "2019",
    description: "Johnny Lightning 1970 Chevy Nova SS in emerald green. Light wear from handling but displays beautifully.",
    images: [
      "https://images.unsplash.com/photo-1566024349410-d79dcf1d8174?q=80&w=500&h=350&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=500&h=350&auto=format&fit=crop"
    ],
    sellerId: "seller7",
    sellerName: "ClassicsDiecast",
    location: "Nashville, TN"
  },
  {
    id: "p8",
    name: "Greenlight 1/64 Ford GT40",
    price: 13.49,
    condition: "new",
    brand: "Greenlight",
    category: "Racing",
    year: "2021",
    description: "New Greenlight 1/64 Ford GT40 in Gulf racing livery. Highly detailed with racing decals and accurate wheel design.",
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=500&h=350&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?q=80&w=500&h=350&auto=format&fit=crop"
    ],
    sellerId: "seller8",
    sellerName: "RacingLegends",
    location: "Indianapolis, IN"
  },
  {
    id: "p9",
    name: "1980s Transformers G1 Hot Rod",
    price: 299.99,
    condition: "fair",
    brand: "Hasbro",
    category: "Vintage",
    year: "1986",
    description: "Vintage G1 Transformers Hot Rod figure. Shows play wear and missing some accessories, but a rare piece for collectors.",
    images: [
      "https://images.unsplash.com/photo-1642114311865-8828f6a383c9?q=80&w=500&h=350&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615106766950-4a8ee98d5584?q=80&w=500&h=350&auto=format&fit=crop"
    ],
    sellerId: "seller9",
    sellerName: "80sToysVault",
    location: "Seattle, WA"
  },
  {
    id: "p10",
    name: "Tarmac Works 1/64 Mercedes-AMG GT3",
    price: 29.99,
    condition: "like new",
    brand: "Tarmac Works",
    category: "Racing",
    year: "2020",
    description: "Tarmac Works 1/64 Mercedes-AMG GT3 in race livery. Opened for display only, complete with box and display base.",
    images: [
      "https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=500&h=350&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543465077-db45d34b88a5?q=80&w=500&h=350&auto=format&fit=crop"
    ],
    sellerId: "seller10",
    sellerName: "PremiumDiecast",
    location: "Los Angeles, CA"
  },
  {
    id: "p11",
    name: "Hot Wheels Premium Fast & Furious Set",
    price: 54.99,
    condition: "new",
    brand: "Hot Wheels",
    category: "Movie Cars",
    year: "2022",
    description: "Complete 5-car set of Hot Wheels Premium Fast & Furious cars. Brand new in original packaging, never opened.",
    images: [
      "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=500&h=350&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600783245998-b8a0474912ed?q=80&w=500&h=350&auto=format&fit=crop"
    ],
    sellerId: "seller11",
    sellerName: "MovieCarCollector",
    location: "Atlanta, GA"
  },
  {
    id: "p12",
    name: "M2 Machines 1957 Chevy Bel Air",
    price: 19.95,
    condition: "good",
    brand: "M2 Machines",
    category: "Classics",
    year: "2019",
    description: "M2 Machines 1957 Chevy Bel Air in two-tone blue and white. Some light handling wear but overall good condition.",
    images: [
      "https://images.unsplash.com/photo-1582639510494-c80b5de9f148?q=80&w=500&h=350&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514316703755-dca7d7d9d882?q=80&w=500&h=350&auto=format&fit=crop"
    ],
    sellerId: "seller12",
    sellerName: "AmericanClassics",
    location: "Dallas, TX"
  }
];

export const categories = [
  "All",
  "Vintage",
  "Sports Cars",
  "JDM",
  "Muscle Cars",
  "Classics",
  "Racing",
  "Movie Cars"
];

export const brands = [
  "All",
  "Hot Wheels",
  "Matchbox",
  "Tomica",
  "Mini GT",
  "Johnny Lightning",
  "Greenlight",
  "M2 Machines",
  "Auto World",
  "Tarmac Works"
];

export const conditions = [
  "All",
  "new",
  "like new",
  "good",
  "fair",
  "poor"
];
