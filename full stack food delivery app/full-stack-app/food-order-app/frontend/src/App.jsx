import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RestaurantDetails from './pages/RestaurantDetails';
import CreateRestaurant from './pages/CreateRestaurant';
import Signup from './pages/Signup';
import Login from './pages/Login';
import RestaurantDashboard from './pages/RestaurantDashboard';
import CartPage from './pages/CartPage';
import PaymentPage from './pages/PaymentPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurants/:id" element={<RestaurantDetails />} />
          <Route
            path="/restaurant/create"
            element={
              <ProtectedRoute roles={['restaurant']}>
                <CreateRestaurant />
              </ProtectedRoute>
            }
          />
          <Route
            path="/restaurant/dashboard"
            element={
              <ProtectedRoute roles={['restaurant']}>
                <RestaurantDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;
