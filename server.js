import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import homeRoutes from './routes/homeRoutes.js';
// import locationRoutes from './routes/locationRoutes.js';
// import storeRoutes from './routes/storeRoutes.js';
// import ordersRoutes from './routes/ordersRoutes.js';
// import profileRoutes from './routes/profileRoutes.js';
// import checkoutRoutes from './routes/checkoutRoutes.js';
import userRoutes from './routes/userRoutes.js';
import vendorRoutes from './routes/vendorRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(cookieParser());

app.get('/', (req, res) => {
	res.send('Api is running...');
})

app.use('/api/home', homeRoutes);
// 
// app.use('/api/location', locationRoutes);
// 
// app.use('/api/store', storeRoutes);
// 
// app.use('/api/orders', ordersRoutes);
// 
// app.use('/api/profile', profileRoutes);
// 
// app.use('/api/checkout', checkoutRoutes);

app.use('/api/users', userRoutes);

app.use('/api/vendors', vendorRoutes);

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${5000}`));