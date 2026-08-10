const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const foodRoutes = require('./routes/foodRoutes');
const cartRoutes = require('./routes/cartRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/cart', cartRoutes);

app.get('/', (req, res) => {
  res.send({ message: 'FoodieHub backend is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
