const Food = require('../models/Food');
const Restaurant = require('../models/Restaurant');

// @desc    Create a new food item
// @route   POST /api/foods
// @access  Private (restaurant owner)
const createFood = async (req, res) => {
  try {
    const { name, price, image, description, restaurantId } = req.body;

    if (!name || price == null || !restaurantId) {
      return res.status(400).json({ message: 'Please add name, price, and restaurantId' });
    }

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    if (restaurant.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to add food to this restaurant' });
    }

    const food = await Food.create({
      name,
      price,
      image: image || '',
      description: description || '',
      restaurantId,
    });

    const populatedFood = await Food.findById(food._id).populate(
      'restaurantId',
      'name address image'
    );

    res.status(201).json(populatedFood);
  } catch (error) {
    console.error('Create food error:', error.message);
    res.status(500).json({ message: 'Server error while creating food' });
  }
};

// @desc    Get all foods (optionally filter by restaurantId)
// @route   GET /api/foods
// @access  Public
const getFoods = async (req, res) => {
  try {
    const filter = req.query.restaurantId ? { restaurantId: req.query.restaurantId } : {};

    const foods = await Food.find(filter).populate('restaurantId', 'name address image');
    res.json(foods);
  } catch (error) {
    console.error('Get foods error:', error.message);
    res.status(500).json({ message: 'Server error while fetching foods' });
  }
};

// @desc    Get single food by ID
// @route   GET /api/foods/:id
// @access  Public
const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id).populate(
      'restaurantId',
      'name address image description'
    );

    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    res.json(food);
  } catch (error) {
    console.error('Get food error:', error.message);
    res.status(500).json({ message: 'Server error while fetching food' });
  }
};

// @desc    Update a food item
// @route   PUT /api/foods/:id
// @access  Private (restaurant owner)
const updateFood = async (req, res) => {
  try {
    const { name, price, image, description } = req.body;

    const food = await Food.findByIdAndUpdate(
      req.params.id,
      {
        name: name ?? req.food.name,
        price: price ?? req.food.price,
        image: image ?? req.food.image,
        description: description ?? req.food.description,
      },
      { new: true, runValidators: true }
    ).populate('restaurantId', 'name address image');

    res.json(food);
  } catch (error) {
    console.error('Update food error:', error.message);
    res.status(500).json({ message: 'Server error while updating food' });
  }
};

// @desc    Delete a food item
// @route   DELETE /api/foods/:id
// @access  Private (restaurant owner)
const deleteFood = async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id);
    res.json({ message: 'Food removed successfully' });
  } catch (error) {
    console.error('Delete food error:', error.message);
    res.status(500).json({ message: 'Server error while deleting food' });
  }
};

module.exports = {
  createFood,
  getFoods,
  getFoodById,
  updateFood,
  deleteFood,
};
