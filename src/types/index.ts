export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  spf: 'SPF 15' | 'SPF 30' | 'SPF 50' | 'SPF 70';
  skinTypes: SkinType[];
  ingredients: string[];
  benefits: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  category: string;
  volume: string;
  waterResistant: boolean;
  featured: boolean;
}

export type SkinType = 'oily' | 'dry' | 'sensitive' | 'combination' | 'normal';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  helpful: number;
  verified: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  paymentMethod: string;
  createdAt: string;
  couponCode?: string;
  discount?: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Coupon {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minOrder: number;
  maxDiscount?: number;
  expiresAt: string;
  active: boolean;
}

export interface Ingredient {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  icon: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface SkinTypeGuide {
  type: SkinType;
  title: string;
  description: string;
  characteristics: string[];
  recommendations: string[];
  products: Product[];
}
