import express from 'express';
import orders from '../data/orders.js';

const router = express.Router();

router.get('/', (req, res) => {
	res.json(orders);
})

export default router;