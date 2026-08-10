const Food = require('../models/Food');
const Restaurant = require('../models/Restaurant');

// Middleware to verify the logged-in user owns the food's restaurant.
const verifyFoodOwner = async (req, res, next) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    const restaurant = await Restaurant.findById(food.restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    if (restaurant.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to manage this food item' });
    }

    req.food = food;
    next();
  } catch (error) {
    console.error('Food owner middleware error:', error.message);
    res.status(500).json({ message: 'Server error while checking food ownership' });
  }
};

module.exports = {
  verifyFoodOwner,
};
