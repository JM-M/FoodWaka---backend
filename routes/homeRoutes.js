import express from 'express';
import homeData from '../data/home.js';

const router = express.Router();

router.get('/', (req, res) => {
	res.json(homeData);
})

export default router;