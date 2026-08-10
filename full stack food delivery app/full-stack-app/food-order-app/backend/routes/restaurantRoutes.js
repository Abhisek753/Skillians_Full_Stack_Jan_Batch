const express = require('express');
const {
  createRestaurant,
  getRestaurants,
  getMyRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} = require('../controllers/restaurantController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const { verifyRestaurantOwner } = require('../middleware/ownerMiddleware');

const router = express.Router();

// Public routes - anyone can browse restaurants
router.get('/', getRestaurants);

// Owner routes - must come before /:id to avoid "my" being treated as an id
router.get('/my', protect, authorize('restaurant'), getMyRestaurants);
router.post('/', protect, authorize('restaurant'), createRestaurant);

// Public single restaurant
router.get('/:id', getRestaurantById);

// Owner-only update and delete (verifyRestaurantOwner checks ownership)
router.put(
  '/:id',
  protect,
  authorize('restaurant'),
  verifyRestaurantOwner,
  updateRestaurant
);
router.delete(
  '/:id',
  protect,
  authorize('restaurant'),
  verifyRestaurantOwner,
  deleteRestaurant
);

module.exports = router;
