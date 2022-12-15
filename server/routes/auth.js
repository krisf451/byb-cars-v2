import express from 'express';
const router = express.Router();

import { signup, signin, getAllUsers } from '../controllers/auth.js';

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/users', getAllUsers);

export default router;

