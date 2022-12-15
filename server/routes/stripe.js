import express from "express";

import { payWithStripe } from "../controllers/stripe.js";

const router = express.Router();

router.post('/', payWithStripe);

export default router;
