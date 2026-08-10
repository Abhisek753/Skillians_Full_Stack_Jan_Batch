import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../contexts/AuthContext';
import { getMyRestaurants } from '../services/api';

function Navbar() {
  const { user, token, logout } = useContext(AuthContext);
  const [hasRestaurant, setHasRestaurant] = useState(false);

  useEffect(() => {
    const loadRestaurantStatus = async () => {
      if (!token || user?.role !== 'restaurant') {
        setHasRestaurant(false);
        return;
      }

      try {
        const restaurants = await getMyRestaurants(token);
        setHasRestaurant(restaurants.length > 0);
      } catch (error) {
        setHasRestaurant(false);
      }
    };

    loadRestaurantStatus();
  }, [token, user?.role]);

  const restaurantLinks = user?.role === 'restaurant' ? (
    hasRestaurant ? (
      <Link to="/restaurant/dashboard" className="hover:text-orange-600">
        Restaurant Dashboard
      </Link>
    ) : (
      <Link to="/restaurant/create" className="hover:text-orange-600">
        Create Restaurant
      </Link>
    )
  ) : null;

  return (
    <header className="border-b border-stone-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-bold text-orange-600">
          FoodieHub
        </Link>

        <nav className="flex items-center gap-4 text-stone-700">
          <Link to="/" className="hover:text-orange-600">
            Home
          </Link>

          {restaurantLinks}

          {user ? (
            <>
              {user.role === 'customer' && (
                <Link to="/cart" className="hover:text-orange-600">
                  Cart
                </Link>
              )}
              <span className="text-sm font-medium">{user.name}</span>
              <button
                onClick={logout}
                className="rounded bg-orange-600 px-3 py-1 text-sm text-white hover:bg-orange-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="hover:text-orange-600">
                Signup
              </Link>
              <Link to="/login" className="hover:text-orange-600">
                Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
