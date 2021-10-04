import express from 'express';
import checkoutData from '../data/checkout.js';

const router = express.Router();

router.post('/', (req, res) => {
	res.json(checkoutData);
})

export default router;