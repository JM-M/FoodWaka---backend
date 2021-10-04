import express from 'express';
import storeData from '../data/store.js';
import storeItem from '../data/storeItem.js';

const router = express.Router();

router.get('/', (req, res) => {
	res.json(storeData);
})

router.get('/items/:id', (req, res) => {
	console.log(req.params.id);
	res.json(storeItem);
})

export default router;