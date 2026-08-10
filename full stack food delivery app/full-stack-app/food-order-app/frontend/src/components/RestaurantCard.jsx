import { Link } from 'react-router-dom';

function RestaurantCard({ restaurant }) {
  return (
    <Link
      to={`/restaurants/${restaurant._id}`}
      className="block overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <img
        src={restaurant.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400'}
        alt={restaurant.name}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{restaurant.name}</h2>
        <p className="mt-1 text-sm text-stone-600">{restaurant.address}</p>
        {restaurant.description && (
          <p className="mt-2 line-clamp-2 text-sm text-stone-500">{restaurant.description}</p>
        )}
      </div>
    </Link>
  );
}

export default RestaurantCard;
