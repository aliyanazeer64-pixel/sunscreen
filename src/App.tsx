import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, CartProvider, WishlistProvider } from './context';
import { MainLayout } from './layouts';
import {
  HomePage,
  ProductsPage,
  ProductDetailPage,
  SkinGuidePage,
  IngredientsPage,
  BenefitsPage,
  ReviewsPage,
  LoginPage,
  RegisterPage,
  CartPage,
  WishlistPage,
  CheckoutPage,
  AdminLayout,
  AdminDashboard,
  AdminProducts,
  AdminOrders,
  AdminUsers,
  AdminOffers,
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Routes>
              {/* Auth pages without layout */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Main pages with layout */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/skin-guide" element={<SkinGuidePage />} />
                <Route path="/ingredients" element={<IngredientsPage />} />
                <Route path="/benefits" element={<BenefitsPage />} />
                <Route path="/reviews" element={<ReviewsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
              </Route>

              {/* Admin routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="offers" element={<AdminOffers />} />
              </Route>
            </Routes>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
