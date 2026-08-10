const Cart = require('../models/Cart');

// Get the current user's cart.
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      cart = await Cart.create({ userId: req.user._id, items: [] });
    }

    res.json(cart);
  } catch (error) {
    console.error('Get cart error:', error.message);
    res.status(500).json({ message: 'Server error while fetching cart' });
  }
};

// Add an item to the cart.
const addToCart = async (req, res) => {
  try {
    const { foodId, name, price, quantity = 1 } = req.body;

    if (!foodId || !name || price == null) {
      return res.status(400).json({ message: 'Please provide food details' });
    }

    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      cart = await Cart.create({ userId: req.user._id, items: [] });
    }

    const existingItem = cart.items.find((item) => item.foodId.toString() === foodId);

    if (existingItem) {
      existingItem.quantity += Number(quantity);
    } else {
      cart.items.push({ foodId, name, price, quantity: Number(quantity) });
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    console.error('Add to cart error:', error.message);
    res.status(500).json({ message: 'Server error while adding to cart' });
  }
};

// Update an item quantity.
const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.id(req.params.itemId);
    if (!item) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    item.quantity = Number(quantity);
    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error('Update cart error:', error.message);
    res.status(500).json({ message: 'Server error while updating cart' });
  }
};

// Remove one item from the cart.
const removeCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter((item) => item._id.toString() !== req.params.itemId);
    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error('Remove cart error:', error.message);
    res.status(500).json({ message: 'Server error while removing cart item' });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
};
