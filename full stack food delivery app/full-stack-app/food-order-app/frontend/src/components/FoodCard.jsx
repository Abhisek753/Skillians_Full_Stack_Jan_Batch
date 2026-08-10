import { useContext } from 'react';
import { toast } from 'react-toastify';
import AuthContext from '../contexts/AuthContext';
import { addToCart } from '../services/api';

function FoodCard({ food }) {
  const { token, user } = useContext(AuthContext);

  const handleAddToCart = async () => {
    if (!token || user?.role !== 'customer') {
      toast.error('Please login as a customer to add items to cart');
      return;
    }

    try {
      await addToCart(
        {
          foodId: food._id,
          name: food.name,
          price: food.price,
          quantity: 1,
        },
        token
      );
      toast.success(`${food.name} added to cart`);
    } catch (error) {
      toast.error('Failed to add item to cart');
    }
  };

  return (
    <article className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm">
      <img
        src={food.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'}
        alt={food.name}
        className="h-40 w-full object-cover"
      />
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold">{food.name}</h3>
          <span className="font-bold text-orange-600">₹{food.price}</span>
        </div>
        {food.description && (
          <p className="mt-2 text-sm text-stone-600">{food.description}</p>
        )}
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full rounded bg-orange-600 px-3 py-2 text-sm font-medium text-white hover:bg-orange-700"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default FoodCard;
