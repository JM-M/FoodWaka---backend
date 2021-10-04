import express from 'express';
import locationData from '../data/location.js';

const router = express.Router();

router.post('/', (req, res) => {
	res.json(locationData);
})

export default router;