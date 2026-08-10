const express = require('express');
const {
  createFood,
  getFoods,
  getFoodById,
  updateFood,
  deleteFood,
} = require('../controllers/foodController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const { verifyFoodOwner } = require('../middleware/foodOwnerMiddleware');

const router = express.Router();

router.get('/', getFoods);
router.get('/:id', getFoodById);

router.post('/', protect, authorize('restaurant'), createFood);
router.put('/:id', protect, authorize('restaurant'), verifyFoodOwner, updateFood);
router.delete('/:id', protect, authorize('restaurant'), verifyFoodOwner, deleteFood);

module.exports = router;
