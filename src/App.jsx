import Header from "./Header";
import Home from "./Home";
import About from "./About";
import Cakes from "./Cakes";
import Order from "./Order";
import Contact from "./Contact";
import { Routes, Route } from 'react-router-dom';
import Footer from './Footer';
import Details from "./Details";
import CartProvider from './context/CartProvider';
import Cart from './Cart';
import Checkout from './Checkout';
import Login from "./Login";
import AuthProvider from "./context/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import MyOrders from "./MyOrders";
import OrderDetails from "./OrderDetails";
import AdminRoute from "./AdminRoute";
import AdminDashboard from "./AdminDashboard";
import CheckoutSuccess from "./CheckoutSuccess";
function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Cakes" element={<Cakes />} />
            <Route path="/Order" element={<Order />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Cakes/:id" element={<Details />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/checkout-success" element={<CheckoutSuccess />} />
            <Route path="/Checkout" element={<ProtectedRoute> <Checkout /> </ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/MyOrders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
            <Route path="/orders/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          </Routes>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </>
  );
}
export default App;
