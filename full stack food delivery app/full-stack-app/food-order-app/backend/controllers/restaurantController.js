const Restaurant = require('../models/Restaurant');

// @desc    Create a new restaurant
// @route   POST /api/restaurants
// @access  Private (restaurant owner)
const createRestaurant = async (req, res) => {
  try {
    const { name, address, image, description } = req.body;

    if (!name || !address) {
      return res.status(400).json({ message: 'Please add name and address' });
    }

    const restaurant = await Restaurant.create({
      name,
      address,
      image: image || '',
      description: description || '',
      ownerId: req.user._id,
    });

    res.status(201).json(restaurant);
  } catch (error) {
    console.error('Create restaurant error:', error.message);
    res.status(500).json({ message: 'Server error while creating restaurant' });
  }
};

// @desc    Get all restaurants (for customers to browse)
// @route   GET /api/restaurants
// @access  Public
const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate('ownerId', 'name email');
    res.json(restaurants);
  } catch (error) {
    console.error('Get restaurants error:', error.message);
    res.status(500).json({ message: 'Server error while fetching restaurants' });
  }
};

// @desc    Get restaurants owned by logged-in user
// @route   GET /api/restaurants/my
// @access  Private (restaurant owner)
const getMyRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ ownerId: req.user._id });
    res.json(restaurants);
  } catch (error) {
    console.error('Get my restaurants error:', error.message);
    res.status(500).json({ message: 'Server error while fetching your restaurants' });
  }
};

// @desc    Get single restaurant by ID
// @route   GET /api/restaurants/:id
// @access  Public
const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate(
      'ownerId',
      'name email'
    );

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.json(restaurant);
  } catch (error) {
    console.error('Get restaurant error:', error.message);
    res.status(500).json({ message: 'Server error while fetching restaurant' });
  }
};

// @desc    Update a restaurant
// @route   PUT /api/restaurants/:id
// @access  Private (restaurant owner only)
const updateRestaurant = async (req, res) => {
  try {
    const { name, address, image, description } = req.body;

    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      {
        name: name ?? req.restaurant.name,
        address: address ?? req.restaurant.address,
        image: image ?? req.restaurant.image,
        description: description ?? req.restaurant.description,
      },
      { new: true, runValidators: true }
    );

    res.json(restaurant);
  } catch (error) {
    console.error('Update restaurant error:', error.message);
    res.status(500).json({ message: 'Server error while updating restaurant' });
  }
};

// @desc    Delete a restaurant
// @route   DELETE /api/restaurants/:id
// @access  Private (restaurant owner only)
const deleteRestaurant = async (req, res) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.json({ message: 'Restaurant removed successfully' });
  } catch (error) {
    console.error('Delete restaurant error:', error.message);
    res.status(500).json({ message: 'Server error while deleting restaurant' });
  }
};

module.exports = {
  createRestaurant,
  getRestaurants,
  getMyRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
};
