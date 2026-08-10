const Restaurant = require('../models/Restaurant');

// Middleware to verify the logged-in user owns the restaurant.
// Use this on update and delete routes before the controller runs.
const verifyRestaurantOwner = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    if (restaurant.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to manage this restaurant' });
    }

    req.restaurant = restaurant;
    next();
  } catch (error) {
    console.error('Owner middleware error:', error.message);
    res.status(500).json({ message: 'Server error while checking restaurant ownership' });
  }
};

module.exports = {
  verifyRestaurantOwner,
};
