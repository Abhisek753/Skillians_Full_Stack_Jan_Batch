const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const connectDB = require('../config/db');
const User = require('../models/User');
const Restuarant = require('../models/Restuarant');
// const Food = require('../models/Food');

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();

    // await Food.deleteMany();
    await Restuarant.deleteMany();

    let owner = await User.findOne({ email: 'spicekitchen@foodiehub.com' });

    if (!owner) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('12345678', salt);

      owner = await User.create({
        name: 'Spice Kitchen Owner',
        email: 'spicekitchen@foodiehub.com',
        password: hashedPassword,
        role: 'restuarant'
      });
    }

    const restaurants = await Restuarant.insertMany([
      {
        name: 'Spice Kitchen',
        ownerId: owner._id,
        address: 'MG Road, Bangalore',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
        description: 'Authentic North Indian cuisine with rich flavors and spices.',
      },
      {
        name: 'Pizza Palace',
        ownerId: owner._id,
        address: 'Indiranagar, Bangalore',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400',
        description: 'Wood-fired pizzas and Italian favorites.',
      },
      {
        name: 'Burger Barn',
        ownerId: owner._id,
        address: 'Koramangala, Bangalore',
        image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400',
        description: 'Juicy burgers, fries, and fast food classics.',
      },
    ]);

    // await Food.insertMany([
    //   {
    //     name: 'Butter Chicken',
    //     price: 320,
    //     restaurantId: restaurants[0]._id,
    //     image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400',
    //     description: 'Creamy tomato-based curry with tender chicken.',
    //   },
    //   {
    //     name: 'Paneer Tikka',
    //     price: 260,
    //     restaurantId: restaurants[0]._id,
    //     image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400',
    //     description: 'Grilled cottage cheese with Indian spices.',
    //   },
    //   {
    //     name: 'Margherita Pizza',
    //     price: 299,
    //     restaurantId: restaurants[1]._id,
    //     image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
    //     description: 'Classic pizza with tomato, mozzarella, and basil.',
    //   },
    //   {
    //     name: 'Farmhouse Pizza',
    //     price: 399,
    //     restaurantId: restaurants[1]._id,
    //     image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
    //     description: 'Loaded with veggies and extra cheese.',
    //   },
    //   {
    //     name: 'Classic Burger',
    //     price: 199,
    //     restaurantId: restaurants[2]._id,
    //     image: 'https://images.unsplash.com/photo-1568901349315-1c692d945a2a?w=400',
    //     description: 'chicken patty with lettuce, tomato, and special sauce.',
    //   },
    //   {
    //     name: 'Cheese Fries',
    //     price: 149,
    //     restaurantId: restaurants[2]._id,
    //     image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400',
    //     description: 'Crispy fries topped with melted cheese.',
    //   },
    // ]);

    console.log('Sample restaurants and foods added successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
};

seedDatabase();
