import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '../contexts/AuthContext';
import { getCart, removeCartItem, updateCartItem } from '../services/api';

function CartPage() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
    try {
      setLoading(true);
      const data = await getCart(token);
      setCart(data);
    } catch (error) {
      toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadCart();
    }
  }, [token]);

  const handleQuantityChange = async (itemId, quantity) => {
    try {
      const updatedCart = await updateCartItem(itemId, quantity, token);
      setCart(updatedCart);
    } catch (error) {
      toast.error('Failed to update quantity');
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const updatedCart = await removeCartItem(itemId, token);
      setCart(updatedCart);
      toast.success('Item removed');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  if (loading) {
    return <p className="text-stone-600">Loading cart...</p>;
  }

  return (
    <section className="mx-auto max-w-5xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Your Cart</h1>
          <p className="mt-1 text-stone-600">Review your selected food items.</p>
        </div>
        <Link to="/" className="text-sm text-orange-600 hover:underline">
          Continue Shopping
        </Link>
      </div>

      {!cart || cart.items.length === 0 ? (
        <div className="rounded-lg bg-white p-8 text-center shadow-md">
          <h2 className="text-xl font-semibold">Your cart is empty</h2>
          <p className="mt-2 text-stone-600">Add some delicious food from the restaurants page.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.items.map((item) => (
            <div key={item._id} className="rounded-lg bg-white p-4 shadow-md">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-stone-600">₹{item.price} each</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuantityChange(item._id, Math.max(1, item.quantity - 1))}
                    className="rounded border px-2 py-1"
                  >
                    -
                  </button>
                  <span className="min-w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                    className="rounded border px-2 py-1"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="rounded border border-red-300 px-3 py-2 text-sm text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="rounded-lg bg-white p-4 shadow-md">
            <p className="text-lg font-semibold">
              Total Items: {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
            </p>
            <p className="mt-2 text-lg font-semibold text-orange-600">
              Total Price: ₹
              {cart.items
                .reduce((sum, item) => sum + item.price * item.quantity, 0)
                .toFixed(2)}
            </p>
            <button
              onClick={() => navigate('/payment', { state: { totalAmount: cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0) } })}
              className="mt-4 rounded bg-orange-600 px-4 py-2 font-semibold text-white transition hover:bg-orange-700"
            >
              Pay Now
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default CartPage;
